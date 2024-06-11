import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteEvent } from "../../../services/events.service";
import {
  getUserByUsernameSnapshot,
  getAllUsersArray,
} from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import Button from "../../../components/Button/Button";
import EventEndDateTime from "../../../components/Events/EventMeta/EventEndDateTime";
import EventStartDateTime from "../../../components/Events/EventMeta/EventStartDateTime";
import EventLocation from "../../../components/Events/EventMeta/EventLocation";
import UserSnippet from "../../../components/UserSnippet/UserSnippet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditEventForm from "../../../components/Events/EditEvent/EditEventForm/EditEventForm";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { joinEvent, leaveEvent } from "../../../services/events.service";
import InvitedToEvent from "../../../components/Events/InviteToEvent/InviteToEvent";
import { onValue, ref } from "firebase/database";
import { db } from "../../../config/firebase-config";
import AdminComponentProtect from "../../../hoc/AdminLogic/AdminComponentProtect/AdminComponentProtect";

function SingleEvent() {
  const { setLoading } = useContext(LoaderContext);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { id } = useParams();
  const [editEventModal, setEditEventModal] = useState(false);
  const [invitingModal, setInvitingModal] = useState(false);

  useEffect(() => {
    try {
      return onValue(ref(db, `events/${id}`), (snapshot) => {
        setEvent(snapshot.val());
      });
    } catch (error) {
      console.error("Error in SingleEvent.jsx > useEffect (getEvent):", error);
      throw error;
    }
  }, [id]);

  useEffect(() => {
    if (event) {
      try {
        setLoading(true);
        getUserByUsernameSnapshot(event.creator)
          .then((creator) => {
            setCreator(creator);
          })
          .catch((error) => {
            console.error(
              "Error in SingleEvent.jsx > useEffect (getCreator):",
              error
            );
            throw error;
          });
        getAllUsersArray()
          .then((users) => {
            const participants = users.filter((user) => {
              return event.participants[user.username];
            });
            setParticipants(participants);
          })
          .catch((error) => {
            console.error(
              "Error in SingleEvent.jsx > useEffect (getParticipants):",
              error
            );
            throw error;
          });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(
          "Error in SingleEvent.jsx > second useEffect (creator and participants):",
          error
        );
        throw error;
      }
    }
  }, [event, setLoading]);

  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(event);
      navigate("/events");
      toast.success(`You've successfully deleted event: ${event.title}`);
    } catch (error) {
      console.error("Error in SingleEvent.jsx > handleDeleteEvent:", error);
      throw error;
    }
  };

  const handleJoinEvent = async () => {
    //TODO: Add logic where if user is invited and joins the event, the invite is deleted
    try {
      await joinEvent(userData.username, event.eid);
      toast.success(`You've successfully joined the event: ${event.title}`);
    } catch (error) {
      console.error("Error in SingleEvent.jsx > handleJoinEvent:", error);
      throw error;
    }
  };

  const handleLeaveEvent = async () => {
    try {
      if (
        !window.confirm(
          "Are you sure you want to leave the event? All participant invitations will be canceled if you do."
        )
      )
        return;

      await leaveEvent(userData.username, event.eid, userData.isInviting);
      toast.success(`You've successfully left the event: ${event.title}`);
    } catch (error) {
      console.error("Error in SingleEvent.jsx > handleLeaveEvent:", error);
      throw error;
    }
  };

  return (
    <div className="single-event m-8 flex flex-row gap-8">
      <div className="single-event__left w-2/3 bg-base-200 py-6 px-8  rounded-3xl">
        {/*TODO: Add edit and delete functionality for ADMINS logic too*/}
        <div className="event-created-updated-date-and-edit-delete flex flex-row justify-between mb-3">
          <div className="event-created-updated flex gap-4 text-gray-300">
            <span>
              Created on:{" "}
              {event?.createdOn &&
                new Date(event.createdOn).toLocaleDateString("en-GB") +
                " at " +
                new Date(event.createdOn).toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
            </span>
            {event?.updatedOn && (
              <span>
                Updated on:{" "}
                {event?.updatedOn &&
                  new Date(event.updatedOn).toLocaleDateString("en-GB") +
                  " " +
                  new Date(event.updatedOn).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
              </span>
            )}
          </div>
          {userData?.isAdmin && (
            <AdminComponentProtect>
              <div className="event-edit-delete flex justify-end gap-4">
                <span
                  onClick={() => setEditEventModal(!editEventModal)}
                  className="underline hover:no-underline cursor-pointer"
                >
                  Edit
                </span>
                {editEventModal && (
                  <EditEventForm
                    event={event}
                    setEvent={setEvent}
                    setEditEventModal={setEditEventModal}
                  />
                )}
                <span
                  onClick={handleDeleteEvent}
                  className="text-red-500 underline hover:no-underline cursor-pointer"
                >
                  Delete
                </span>
              </div>
            </AdminComponentProtect>
          )}
          {event?.creator === userData?.username && !userData?.isAdmin && (
            <div className="event-edit-delete flex justify-end gap-4">
              <span
                onClick={() => setEditEventModal(!editEventModal)}
                className="underline hover:no-underline cursor-pointer"
              >
                Edit
              </span>
              {editEventModal && (
                <EditEventForm
                  event={event}
                  setEvent={setEvent}
                  setEditEventModal={setEditEventModal}
                />
              )}
              <span
                onClick={handleDeleteEvent}
                className="text-red-500 underline hover:no-underline cursor-pointer"
              >
                Delete
              </span>
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold uppercase mb-4">{event?.title}</h1>
        <img
          src={event?.image}
          alt={event?.title}
          width="100%"
          className="rounded-2xl mb-4 aspect-40/21 object-cover"
        />
        <p className="text-lg">{event?.description}</p>

        <hr className="my-6" />

        <div className="event-participants">
          <h2 className="text-2xl font-semibold mb-4">Participants:</h2>
          <div className="participants flex flex-row gap-4">
            {participants.map((participant) => (
              <UserSnippet key={participant.username} user={participant} />
            ))}
          </div>
        </div>
      </div>
      <div className="single-event__right w-1/3 flex flex-col gap-6">
        <div className="buttons-private flex gap-6 items-center justify-between">
          <div className="buttons-private__buttons flex gap-5">
            {!event?.participants[userData?.username] ? (
              <Button onClick={handleJoinEvent}>Join Event</Button>
            ) : (
              <>
                {event?.creator !== userData?.username && (
                  <Button onClick={handleLeaveEvent}>Leave Event</Button>
                )}
                {event?.creator === userData?.username ? (
                  <Button onClick={() => setInvitingModal(!invitingModal)}>
                    Invite Participant
                  </Button>
                ) : (
                  event.canOthersInvite &&
                  event?.creator !== userData?.username && (
                    <Button onClick={() => setInvitingModal(!invitingModal)}>
                      Invite Participant
                    </Button>
                  )
                )}
                {invitingModal && (
                  <InvitedToEvent
                    eventId={event?.eid}
                    invitingUsername={userData?.username}
                    invitingModal={invitingModal}
                    setInvitingModal={setInvitingModal}
                  />
                )}
              </>
            )}
          </div>
          {event?.isPrivate && (
            <div className="private-event flex flex-col items-center rounded-full bg-base-200 p-3 mb-[-10px]">
              <IoShieldCheckmarkOutline className="text-3xl text-green-500" />
              <span className="text-xs uppercase">Private</span>
            </div>
          )}
        </div>

        <div className="event-date-location flex flex-col gap-5 rounded-2xl bg-base-200 p-5">
          <h3 className="text-xl font-semibold my-[-5px]">
            Date, time and location:
          </h3>
          {event && (
            <>
              <div className="flex flex-row gap-5">
                <EventStartDateTime event={event} />
                <EventEndDateTime event={event} />
              </div>
              <EventLocation event={event} />
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.253718515032!2d23.285919675242468!3d42.677167615010056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85da9bb2b5ed%3A0xc5eefb71463a0602!2sg.k.%20Belite%20brezi%2C%20ul.%20%22Vorino%22%2019%2C%201612%20Sofia!5e0!3m2!1sen!2sbg!4v1717081103473!5m2!1sen!2sbg"
                width=""
                height="200"
                loading="lazy"
                className="rounded-xl"
              ></iframe> */}
            </>
          )}
        </div>
        <div className="event-organizer flex flex-col gap-5 rounded-2xl bg-base-200 p-5">
          <h3 className="text-xl font-semibold my-[-5px]">Organizer:</h3>
          <div className="event-organizer-data flex flex-row gap-4">
            <img
              src={creator?.avatar ? creator.avatar : "/anonymous-avatar.jpg"}
              alt={creator?.firstName + " " + creator?.lastName}
              className="rounded-full w-16 h-16 object-cover"
            />
            <div className="event-organizer-user-info flex flex-col">
              <h4 className="text-lg font-semibold">
                {creator?.firstName + " " + creator?.lastName}
              </h4>
              <span>{"@" + creator?.username}</span>
            </div>
          </div>
        </div>
        {/*TODO: Add weather API here if time*/}
        {/* <div className="event-weather flex flex-col gap-5 rounded-2xl bg-base-200 p-5">
          <h3 className="text-xl font-semibold">Expected weather:</h3>
        </div> */}
      </div>
    </div>
  );
}

export default SingleEvent;

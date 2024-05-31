import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../services/events.service";
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
import { getAll } from "firebase/remote-config";

function SingleEvent() {
  const { setLoaderState } = useContext(LoaderContext);
  const { userData } = useContext(AppContext);
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [participants, setParticipants] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getEventById(id)
      .then((event) => {
        setEvent(event);
      })
      .catch((error) =>
        console.error("Error in SingleEvent.jsx > useEffect (getEvent):", error)
      );
  }, [id]);

  useEffect(() => {
    if (event) {
      getUserByUsernameSnapshot(event.creator)
        .then((creator) => {
          setCreator(creator);
        })
        .catch((error) =>
          console.error(
            "Error in SingleEvent.jsx > useEffect (getCreator):",
            error
          )
        );
      //TODO: get participants and set them in state
      getAllUsersArray().then((users) => {
        const participants = users.filter((user) => {
          return event.participants[user.username];
        });
        setParticipants(participants);
      });
    }
  }, [event]);

  return (
    <div className="single-event m-8 flex flex-row gap-8">
      <div className="single-event__left w-2/3 bg-base-200 py-6 px-8  rounded-3xl">
        {event?.creator === userData?.username && (
          <div className="event-edit-delete flex justify-end gap-4">
            <span className="underline hover:no-underline cursor-pointer">
              Edit
            </span>
            <span className="text-red-500 underline hover:no-underline cursor-pointer">
              Delete
            </span>
          </div>
        )}
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
        <div className="buttons flex gap-6">
          <Button>Add to Calendar</Button>
          <Button>Invite friends</Button>
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.253718515032!2d23.285919675242468!3d42.677167615010056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85da9bb2b5ed%3A0xc5eefb71463a0602!2sg.k.%20Belite%20brezi%2C%20ul.%20%22Vorino%22%2019%2C%201612%20Sofia!5e0!3m2!1sen!2sbg!4v1717081103473!5m2!1sen!2sbg"
                width=""
                height="200"
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </>
          )}
        </div>
        <div className="event-organizer flex flex-col gap-5 rounded-2xl bg-base-200 p-5">
          <h3 className="text-xl font-semibold my-[-5px]">Organizer:</h3>
          <div className="event-organizer-data flex flex-row gap-4">
            <img
              src={creator?.avatar}
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
        <div className="event-weather flex flex-col gap-5 rounded-2xl bg-base-200 p-5">
          <h3 className="text-xl font-semibold">Expected weather:</h3>
        </div>
      </div>
    </div>
  );
}

// {creator && <UserSnippet user={creator} />}

export default SingleEvent;

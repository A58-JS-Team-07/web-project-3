import { useEffect, useState, useContext } from "react";
import { getEventById } from "../../../services/events.service";
import { getUserByUsernameSnapshot } from "../../../services/users.service";
import { Link } from "react-router-dom";
import { acceptInvite, deleteInvite } from "../../../services/invites.service";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

/**
 * SingleNotification Component is a reusable component that displays a single notification.
 *
 * @param {Object} props.inviter - The inviter's data.
 * @param {Object} props.event - The event's data.
 * @returns {JSX.Element} - Rendered SingleNotification component.
 */

function SingleNotification({ inviter, event }) {
  const { userData } = useContext(AppContext);
  const [inviterData, setInviterData] = useState(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    (async () => {
      const inviterData = await getUserByUsernameSnapshot(inviter);
      setInviterData(inviterData);

      const eventData = await getEventById(event);
      setEventData(eventData);
    })();
  }, []);

  async function handleAccept() {
    try {
      await acceptInvite(
        eventData?.eid,
        inviterData?.username,
        userData?.username
      );
      toast.success("You have accepted the invite");
    } catch (error) {
      console.error("Error in SingleNotification > handleAccept:", error);
      throw error;
    }
  }
  async function handleDelete() {
    await deleteInvite(
      eventData?.eid,
      inviterData?.username,
      userData?.username
    );
    toast.success("You have deleted the invite");
  }

  return (
    <div className="single-notification my-5 p-3 bg-base-100 rounded-lg">
      <div className="notification__message flex gap-4">
        <div className="avatar w-2/12">
          <div className="w-24 rounded-full">
            <img
              src={
                inviterData?.avatar
                  ? inviterData?.avatar
                  : "/public/anonymous-avatar.jpg"
              }
            />
          </div>
        </div>
        <div className="message w-10/12">
          <span>{`${inviterData?.firstName} ${inviterData?.lastName} invited you to ${eventData?.title}`}</span>
        </div>
      </div>
      <div className="notification__action flex gap-4 justify-between mt-2">
        <button
          className="text-green-600 hover:underline"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button className="text-red-600 hover:underline" onClick={handleDelete}>
          Delete
        </button>
        <Link to={`/events/${eventData?.eid}`}>
          <button className="hover:underline">See the Event</button>
        </Link>
      </div>
    </div>
  );
}

SingleNotification.propTypes = {
  inviter: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
};

export default SingleNotification;

import { IoLocationOutline } from "react-icons/io5";
import { eventLocation } from "../../../common/constants";
import propTypes from "prop-types";

function EventLocation({ event }) {
  return (
    <div className="event__location flex flex-col bg-base-100 px-3 py-2 rounded-lg">
      <div className="event__start__date flex flex-row gap-2 items-center">
        <IoLocationOutline className="text-lg fill-secondary text-secondary" />
        {eventLocation(event)}
      </div>
    </div>
  );
}

EventLocation.propTypes = {
  event: propTypes.object.isRequired,
};

export default EventLocation;

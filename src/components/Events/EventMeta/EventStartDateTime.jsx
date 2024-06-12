import propTypes from "prop-types";
import { eventStartDate, eventStartTime } from "../../../common/constants";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";

/**
 * EventStartDateTime component is used to display the start date and time of the event.
 *
 * @param {object} event - The event object.
 * @returns - The JSX element for EventStartDateTime component.
 */

function EventStartDateTime({ event }) {
  return (
    <>
      <div className="event__start flex flex-col bg-base-100 px-3 py-2 rounded-lg w-full">
        <span className="font-semibold mb-1">Start:</span>
        <div className="event__start__date flex flex-row gap-2 items-center">
          <IoCalendarOutline className="text-lg fill-secondary text-secondary" />
          {eventStartDate(event)}
        </div>
        <div className="event__start__date flex flex-row gap-2 items-center">
          <IoTimeOutline className="text-lg fill-secondary text-secondary" />
          {eventStartTime(event)}
        </div>
      </div>
    </>
  );
}

EventStartDateTime.propTypes = {
  event: propTypes.object.isRequired,
};

export default EventStartDateTime;

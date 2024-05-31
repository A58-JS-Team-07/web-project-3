import propTypes from "prop-types";
import { eventEndDate, eventEndTime } from "../../../common/constants";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";

function EventEndDateTime({ event }) {
  return (
    <>
      <div className="event__end flex flex-col bg-base-100 px-3 py-2 rounded-lg w-full">
        <span className="font-semibold mb-1">End:</span>
        <div className="event__end__date flex flex-row gap-2 items-center">
          <IoCalendarOutline className="text-lg fill-secondary text-secondary" />
          {eventEndDate(event)}
        </div>
        <div className="event__end__time flex flex-row gap-2 items-center">
          <IoTimeOutline className="text-lg fill-secondary text-secondary" />
          {eventEndTime(event)}
        </div>
      </div>
    </>
  );
}

EventEndDateTime.propTypes = {
  event: propTypes.object.isRequired,
};

export default EventEndDateTime;

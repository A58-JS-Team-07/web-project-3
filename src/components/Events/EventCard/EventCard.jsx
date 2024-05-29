import propTypes from "prop-types";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import {
  eventStartDate,
  eventEndDate,
  eventStartTime,
  eventEndTime,
  eventLocation,
} from "../../../common/constants";
import Button from "../../Button/Button";

function EventCard({ event }) {
  return (
    <div className="event w-1/3 bg-base-200 rounded-xl overflow-hidden shadow-lg">
      <div className="event__image">
        <img src={event.image} alt={event.title} className="rounded-xl" />
      </div>
      <div className="event__content p-6">
        <h2 className="font-bold text-2xl mb-3">{event.title}</h2>
        <p className="min-h-12">
          {event.description.substring(0, 110) + "..."}
        </p>
        <div className="event__content__meta flex flex-col mt-3 gap-2 mb-4">
          <div className="event__content__meta__start-end flex flex-row gap-4">
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
            <div className="event__end flex flex-col bg-base-100 px-3 py-2 rounded-lg w-full">
              <span className="font-semibold mb-1">End:</span>
              <div className="event__start__date flex flex-row gap-2 items-center">
                <IoCalendarOutline className="text-lg fill-secondary text-secondary" />
                {eventEndDate(event)}
              </div>
              <div className="event__start__date flex flex-row gap-2 items-center">
                <IoTimeOutline className="text-lg fill-secondary text-secondary" />
                {eventEndTime(event)}
              </div>
            </div>
          </div>
          <div className="event__location flex flex-col bg-base-100 px-3 py-2 rounded-lg">
            <div className="event__start__date flex flex-row gap-2 items-center">
              <IoLocationOutline className="text-lg fill-secondary text-secondary" />
              {eventLocation(event)}
            </div>
          </div>
        </div>
        <Button>View Event</Button>
      </div>
    </div>
  );
}

export default EventCard;

import propTypes from "prop-types";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import EventEndDateTime from "../EventMeta/EventEndDateTime";
import EventStartDateTime from "../EventMeta/EventStartDateTime";
import EventLocation from "../EventMeta/EventLocation";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

/**
 * EventCard component which displays the event information for listing page.
 *
 * @param {Object} event - The event object to display.
 * @returns {JSX.Element} - Rendered EventCard component.
 */

function EventCard({ event }) {
  return (
    <div className="event w-full bg-base-200 rounded-xl overflow-hidden shadow-lg relative">
      <div className="event__image ">
        {event?.isPrivate && (
          <div className="private-event flex flex-col items-center rounded-full bg-base-200 p-3 mb-[-10px] absolute right-4 top-3 shadow-sm">
            <IoShieldCheckmarkOutline className="text-2xl text-green-500" />
            <span className="text-[10px] uppercase">Private</span>
          </div>
        )}
        <img
          src={event.image}
          alt={event.title}
          height="1200px"
          width="630px"
          className="rounded-xl aspect-40/21 object-cover"
        />
      </div>
      <div className="event__content p-6">
        <h2 className="font-bold text-2xl mb-3">{event.title}</h2>
        <p className="min-h-12">
          {event.description.substring(0, 110) + "..."}
        </p>
        <div className="event__content__meta flex flex-col mt-3 gap-2 mb-4">
          <div className="event__content__meta__start-end flex flex-row gap-4">
            <EventStartDateTime event={event} />
            <EventEndDateTime event={event} />
          </div>
          <EventLocation event={event} />
        </div>
        <Link to={`/events/${event.eid}`}>
          <Button>View Event</Button>
        </Link>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: propTypes.object.isRequired,
};

export default EventCard;

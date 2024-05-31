import propTypes from "prop-types";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import EventEndDateTime from "../EventMeta/EventEndDateTime";
import EventStartDateTime from "../EventMeta/EventStartDateTime";
import EventLocation from "../EventMeta/EventLocation";

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
            <EventStartDateTime event={event} />
            <EventEndDateTime event={event} />
          </div>
          <EventLocation event={event} />
        </div>
        <Link to={`/events/${event.id}`}>
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

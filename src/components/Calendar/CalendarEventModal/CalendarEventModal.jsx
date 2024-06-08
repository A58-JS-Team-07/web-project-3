import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function CalendarEventModal({
  event,
  setDisplayEventModalId = () => {},
  clickPosition = { x: 0, y: 0 },
}) {
  return (
    <div
      style={{ left: clickPosition.x, top: clickPosition.y }}
      className="event-item-calendar-event-modal rounded-2xl shadow-md absolute flex max-w-80 bg-base-200"
      id="event-modal-id"
    >
      <button
        className="cursor-pointer bg-base-200 p-1 rounded-full text-lg absolute right-4 top-4 hover:scale-110 transition-all"
        onClick={() => setDisplayEventModalId(null)}
      >
        <IoClose />
      </button>
      <Link to={`/events/${event.eid}`}>
        <div className="event__image ">
          <img
            src={event.image}
            alt={event.title}
            height="1200px"
            width="630px"
            className="rounded-xl aspect-40/21 object-cover"
          />
        </div>
        <div className="event__content p-4 flex flex-col justify-start items-start">
          <h2 className="font-bold text-xl text-left">{event.title}</h2>
          <p className="min-h-12 text-left font-normal">
            {event.description.substring(0, 65) + "..."}
          </p>
        </div>
      </Link>
    </div>
  );
}

CalendarEventModal.propTypes = {
  event: propTypes.object.isRequired,
  setDisplayEventModalId: propTypes.func,
  clickPosition: propTypes.object,
};

export default CalendarEventModal;

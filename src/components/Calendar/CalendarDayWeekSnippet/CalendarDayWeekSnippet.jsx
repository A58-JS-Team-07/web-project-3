import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import CalendarEventModal from "../CalendarEventModal/CalendarEventModal";

/**
 * CalendarDayWeekSnippet component which provides a snippet of an event in the week or day view of the calendar
 * @param {Object} event - The event to display.
 * @param {String} design - The design of the snippet - "main" for main color, "light" for light color.
 * @returns {JSX.Element} - Rendered CalendarDayWeekSnippet component
 */

function CalendarDayWeekSnippet({ event, design = "main" }) {
  const [displayEventModalId, setDisplayEventModalId] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleClickOutside(event) {
      try {
        const modal = document.getElementById("event-modal-id");
        if (modal && !modal.contains(event.target)) {
          setDisplayEventModalId(null);
        }
      } catch (error) {
        console.error(
          "Error in CalendarDayWeekSnippet.jsx > useEffect > handleClickOUtside:",
          error
        );
        throw error;
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEventClick(e, eventId) {
    try {
      setDisplayEventModalId(eventId);
      const rect = e.target.getBoundingClientRect();
      const calendarRect = document
        .querySelector(".calendar-selector")
        .getBoundingClientRect();
      const x = rect.left - calendarRect.left;
      const y = rect.top - calendarRect.top;
      const windowWidth = calendarRect.width;
      const windowHeight = calendarRect.height;
      const modalHeight = 320;

      const xOffset = x > windowWidth / 2 ? -320 : 50;
      const yOffset = y + modalHeight > windowHeight ? -modalHeight : 50;

      setClickPosition({ x: x + xOffset, y: y + yOffset });
    } catch (error) {
      console.error(
        "Error in CalendarDayWeekSnippet.jsx > handleEventClick:",
        error
      );
      throw error;
    }
  }

  return (
    <div
      onClick={(e) => handleEventClick(e, event.eid)}
      className={`calendar-week-hour-event-snippet w-full h-full p-1 cursor-pointer ${
        design === "main" ? "bg-secondary" : "bg-secondary-light"
      }`}
    >
      <div className="calendar-week-hour-event-snippet__title text-white text-sm leading-none ">
        {event.title}
      </div>
      {displayEventModalId === event.eid && (
        <div className="calendar-day-event-details opacity-">
          <CalendarEventModal
            event={event}
            setDisplayEventModalId={setDisplayEventModalId}
            clickPosition={clickPosition}
          />
        </div>
      )}
    </div>
  );
}

CalendarDayWeekSnippet.propTypes = {
  event: PropTypes.object.isRequired,
  design: PropTypes.string,
};

export default CalendarDayWeekSnippet;

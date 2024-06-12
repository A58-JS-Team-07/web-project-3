import { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";
import CalendarEventModal from "../../CalendarEventModal/CalendarEventModal";

/**
 * MonthDaySnippet component which provides a snippet of a day in the month view of the calendar
 *
 * @param {Object} day - The day to display.
 * @param {Array} events - The events to display for the day.
 * @param {Boolean} ofFocus - If the displayed day is out of this month.
 * @returns {JSX.Element} - Rendered MonthDaySnippet component
 */

function MonthDaySnippet({ day, events = [], ofFocus = false }) {
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
          "Error in MonthDaySnippet.jsx > useEffect > handleClickOutside:",
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
      console.error("Error in MonthDaySnippet.jsx > handleEventClick:", error);
      throw error;
    }
  }

  return (
    <div className="calendar-day flex flex-col justify-start items-center text-center border min-h-32 font-semibold p-2">
      <div
        className={`calendar-day-date w-8 h-8 rounded-full flex flex-col items-center justify-center ${
          isToday(day) ? "bg-secondary text-white" : ""
        } ${ofFocus ? "opacity-30" : ""}`}
      >
        {format(day, "d")}
      </div>
      <div className="calendar-day-event w-full">
        {events.map((event) => (
          <div key={event.event.eid}>
            <div
              onClick={(e) => handleEventClick(e, event.event.eid)}
              className="calendar-day-event-item font-normal text-sm bg-secondary text-white rounded-lg py-1 px-2 mt-1 w-full overflow-hidden whitespace-nowrap overflow-ellipsis text-left cursor-pointer"
            >
              {event.event.title}
            </div>
            {displayEventModalId === event.event.eid && (
              <div className="calendar-day-event-details">
                <CalendarEventModal
                  event={event.event}
                  setDisplayEventModalId={setDisplayEventModalId}
                  clickPosition={clickPosition}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

MonthDaySnippet.propTypes = {
  day: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  ofFocus: PropTypes.bool,
};

export default MonthDaySnippet;

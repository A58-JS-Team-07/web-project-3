import { WEEKDAYS } from "../../../common/constants";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import MonthDaySnippet from "./MonthDaySnippet/MonthDaySnippet";
import propTypes from "prop-types";

/**
 * CalendarMonth component which provides a month view of the calendar
 *
 * @param {Object} date - The current date. Based on this date, the month is displayed.
 * @param {Array} events - The events to display in the month
 * @returns {JSX.Element} - Rendered CalendarMonth component
 */

function CalendarMonth({ date, events = [] }) {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startingDayIndex =
    firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
  const lastDayOfPreviousMonth = subMonths(lastDayOfMonth, 1);
  const firstDayOfNextMonth = subMonths(firstDayOfMonth, -1);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  let daysInPreviousMonth =
    startingDayIndex === 0
      ? []
      : eachDayOfInterval({
          start: subDays(
            lastDayOfPreviousMonth,
            startingDayIndex === 0 ? 0 : Math.max(0, startingDayIndex - 1)
          ),
          end: lastDayOfPreviousMonth,
        });

  const indexDaysInNextMonth =
    35 - daysInMonth.length - daysInPreviousMonth.length;

  const daysInNextMonth =
    indexDaysInNextMonth > 0
      ? eachDayOfInterval({
          start: firstDayOfNextMonth,
          end: addDays(firstDayOfNextMonth, indexDaysInNextMonth - 1),
        })
      : [];

  return (
    <div className="calendar-month calendar-selector">
      <div className="calendar grid grid-cols-7 relative">
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="calendar-weekday font-bold text-center p-2"
          >
            {day}
          </div>
        ))}
        {daysInPreviousMonth.map((day, index) => {
          const dayTime = day.getTime();

          const allEventsInDay = events.filter((event) => {
            const eventTime = event.date.getTime();
            return eventTime === dayTime;
          });

          return (
            <MonthDaySnippet
              key={`${dayTime}-${index}`}
              day={day}
              events={allEventsInDay ? allEventsInDay : []}
              ofFocus={true}
            />
          );
        })}
        {daysInMonth.map((day, index) => {
          const dayTime = day.getTime();

          const allEventsInDay = events.filter((event) => {
            const eventTime = event.date.getTime();
            return eventTime === dayTime;
          });

          return (
            <MonthDaySnippet
              key={`${dayTime}-${index}`}
              day={day}
              events={allEventsInDay ? allEventsInDay : []}
            />
          );
        })}
        {daysInNextMonth.map((day, index) => {
          const dayTime = day.getTime();

          const allEventsInDay = events.filter((event) => {
            const eventTime = event.date.getTime();
            return eventTime === dayTime;
          });

          return (
            <MonthDaySnippet
              key={`${dayTime}-${index}`}
              day={day}
              events={allEventsInDay ? allEventsInDay : []}
              ofFocus={true}
            />
          );
        })}
      </div>
    </div>
  );
}

CalendarMonth.propTypes = {
  date: propTypes.object.isRequired,
  events: propTypes.array,
};

export default CalendarMonth;

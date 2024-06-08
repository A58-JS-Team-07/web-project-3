import {
  WEEKDAYS,
  CURRENT_DATE,
  monthStartingDayIndex,
} from "../../../common/constants";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isToday,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import MonthDaySnippet from "./MonthDaySnippet/MonthDaySnippet";

const customDate = new Date("2024 5 28");

function CalendarMonth({ date, events = [] }) {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startingDayIndex = monthStartingDayIndex(firstDayOfMonth);
  const lastDayOfPreviousMonth = subMonths(lastDayOfMonth, 1);
  const firstDayOfNextMonth = subMonths(firstDayOfMonth, -1);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const daysInPreviousMonth = eachDayOfInterval({
    start: subDays(lastDayOfPreviousMonth, startingDayIndex - 1),
    end: lastDayOfPreviousMonth,
  });

  const indexDaysInNextMonth =
    35 - daysInMonth.length - daysInPreviousMonth.length;

  const daysInNextMonth =
    indexDaysInNextMonth > 0
      ? eachDayOfInterval({
          start: firstDayOfNextMonth,
          end: subDays(firstDayOfNextMonth, indexDaysInNextMonth - 1),
        })
      : [];

  return (
    <div className="calendar-month">
      <div className="calendar grid grid-cols-7 relative">
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className="calendar-weekday font-bold text-center p-2"
          >
            {day}
          </div>
        ))}
        {daysInPreviousMonth.map((day, index) => (
          <MonthDaySnippet
            key={`${day.getTime()}-${index}`}
            day={day}
            ofFocus={true}
          />
        ))}
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
      </div>
    </div>
  );
}

export default CalendarMonth;

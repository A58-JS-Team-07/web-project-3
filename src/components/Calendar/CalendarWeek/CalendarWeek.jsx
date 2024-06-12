import { useEffect, useState } from "react";
import { WEEKDAYS, HOURS, CURRENT_DATE } from "../../../common/constants";
import propTypes from "prop-types";
import { addDays, getDate, isSameDay, startOfWeek } from "date-fns";
import CalendarDayWeekSnippet from "../CalendarDayWeekSnippet/CalendarDayWeekSnippet";

/**
 * CalendarWeek component which provides a week view of the calendar
 *
 * @param {Object} date - The current date. Based on this date, the week is displayed.
 * @param {Array} events - The events to display in the week.
 * @returns {JSX.Element} - Rendered CalendarWeek component.
 */

function CalendarWeek({ date, events = [] }) {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    try {
      if (!date) return;

      const startWeek = startOfWeek(date, { weekStartsOn: 1 });

      const weekConstructor = [];

      WEEKDAYS.map((day, i) => {
        const weekDay = addDays(startWeek, i);
        weekConstructor.push({
          dayName: day,
          date: weekDay,
        });
      });

      setWeek(weekConstructor);
    } catch (error) {
      console.error("Error in CalendarWeek.jsx > useEffect:", error);
      throw error;
    }
  }, [date]);

  return (
    <div className="calendar-week calendar-selector flex flex-row">
      <div className="calendar-week-time px-2">
        <div className="calendar-week-time-slot-empty h-16"></div>
        {HOURS.map((hour) => (
          <div key={hour} className="calendar-week-time-slot h-12">
            <span className="text-xs">{hour}</span>
          </div>
        ))}
      </div>
      <div className="calendar-week grid grid-cols-7 relative w-full">
        {week.map((day, index) => {
          const dayTime = day.date.getTime();

          const allEventsInDay = events.filter((event) => {
            const eventTime = event.date.getTime();
            return eventTime === dayTime;
          });

          return (
            <div key={`${day.date}-${index}`} className="calendar-weekday">
              <div className="calendar-week-date-info flex flex-col items-center p-2">
                <span className="text-sm font-normal mb-[-3px]">
                  {day.dayName}
                </span>
                <span
                  className={`text-2xl font-bold w-10 h-10 ${
                    isSameDay(CURRENT_DATE, day.date)
                      ? "bg-secondary text-white rounded-full flex items-center justify-center pr-[1px]"
                      : "text-center"
                  }`}
                >
                  {getDate(day.date)}
                </span>
              </div>
              <div className="calendar-week-date-hour-slots grid grid-rows-24">
                {HOURS.map((hour, index) => (
                  <div
                    key={`${hour}-${index}`}
                    className="calendar-week-hour-slot border border-gray-200 h-12 max-h-12 overflow-hidden flex flex-row"
                  >
                    {allEventsInDay.length > 0 &&
                      allEventsInDay.map((event, i) => {
                        const eventStartTimeHr = Number(
                          event?.event?.startDateTime?.hours
                        );
                        const eventEndTimeHr = Number(
                          event?.event?.endDateTime?.hours
                        );
                        const currentHour = Number(hour.split(":")[0]);

                        if (
                          currentHour >= eventStartTimeHr &&
                          currentHour < eventEndTimeHr
                        ) {
                          return (
                            <CalendarDayWeekSnippet
                              key={`${event.event.eid}-${hour}`}
                              event={event.event}
                              design={i % 2 === 0 ? "main" : "secondary"}
                            />
                          );
                        }
                      })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

CalendarWeek.propTypes = {
  date: propTypes.instanceOf(Date).isRequired,
  events: propTypes.array,
};

export default CalendarWeek;

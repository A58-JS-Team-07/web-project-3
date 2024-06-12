import { useEffect, useState } from "react";
import { HOURS, CURRENT_DATE } from "../../../common/constants";
import propTypes from "prop-types";
import { getDate, getDay, isSameDay } from "date-fns";
import CalendarDayWeekSnippet from "../CalendarDayWeekSnippet/CalendarDayWeekSnippet";

/**
 * CalendarDay component which provides a day view of the calendar
 *
 * @param {Date} date - The date to display
 * @param {Array} events - The events to display
 * @returns {JSX.Element} - Rendered CalendarDay component
 */
function CalendarDay({ date, events = [] }) {
  const [week, setWeek] = useState([]);

  useEffect(() => {
    try {
      if (!date) return;

      const dayNum = getDay(date);
      let dayName = "";

      switch (dayNum) {
        case 0:
          dayName = "Sun";
          break;
        case 1:
          dayName = "Mon";
          break;
        case 2:
          dayName = "Tue";
          break;
        case 3:
          dayName = "Wed";
          break;
        case 4:
          dayName = "Thu";
          break;
        case 5:
          dayName = "Fri";
          break;
        case 6:
          dayName = "Sat";
          break;
      }

      //Fixes date issue. Time must be 00:00:00
      const fixDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const weekConstructor = [
        {
          dayName: dayName,
          date: fixDate,
        },
      ];

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
      <div className="calendar-week grid grid-cols-1 relative w-full">
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

CalendarDay.propTypes = {
  date: propTypes.instanceOf(Date).isRequired,
  events: propTypes.array,
};

export default CalendarDay;

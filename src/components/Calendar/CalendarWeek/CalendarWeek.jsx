import { useEffect, useState } from "react";
import { WEEKDAYS, HOURS, CURRENT_DATE } from "../../../common/constants";
import propTypes from "prop-types";
import { addDays, getDate, isSameDay, startOfWeek } from "date-fns";

// HOURS = [00:00, 01:00, 02:00, 03:00, 04:00, 05:00, 06:00, 07:00, 08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00]

function CalendarWeek({ date, events = [] }) {
  const [week, setWeek] = useState([]);

  // console.log(isSameDay(new Date("2024, 6, 8")));

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

  console.log(week);

  return (
    <div className="calendar-week">
      <div className="calendar-week grid grid-cols-7">
        {week.map((day, index) => (
          <div key={`${day.date}-${index}`} className="calendar-weekday">
            {console.log(day.date)}
            <div className="calendar-week-date-info flex flex-col items-center p-2">
              <span className="text-sm font-normal mb-[-3px]">
                {day.dayName}
              </span>
              <span
                className={`text-2xl font-bold w-10 h-10 ${
                  isSameDay(CURRENT_DATE, day.date)
                    ? "bg-secondary text-white rounded-full flex items-center justify-center pr-1"
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
                  className="calendar-week-hour-slot border border-gray-200 min-h-20"
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarWeek.propTypes = {
  date: propTypes.instanceOf(Date).isRequired,
  events: propTypes.array,
};

export default CalendarWeek;

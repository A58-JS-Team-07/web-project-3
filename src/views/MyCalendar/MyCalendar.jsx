import { useState, useContext, useEffect } from "react";
import CalendarMonth from "../../components/Calendar/CalendarMonth/CalendarMonth";
import { CURRENT_DATE } from "../../common/constants";
import Button from "../../components/Button/Button";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import {
  eachDayOfInterval,
  endOfWeek,
  getWeek,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { AppContext } from "../../context/AppContext";
import { getAllEvents } from "../../services/events.service";
import CalendarWeek from "../../components/Calendar/CalendarWeek/CalendarWeek";
import CalendarWorkWeek from "../../components/Calendar/CalendarWorkWeek/CalendarWorkWeek";
import CalendarDay from "../../components/Calendar/CalendarDay/CalendarDay";

/**
 * MyCalendar component is used to display the user's calendar.
 *
 * @returns - The JSX element for MyCalendar component.
 */

function MyCalendar() {
  const { userData } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [nav, setNav] = useState(CURRENT_DATE);
  const [calendarView, setCalendarView] = useState("month");

  useEffect(() => {
    try {
      if (userData.participatingEvents) {
        const userEvents = Object.keys(userData.participatingEvents);

        getAllEvents().then((events) => {
          const filteredEvents = events.filter((event) =>
            userEvents.includes(event.eid)
          );

          const dateEvents = [];

          filteredEvents.forEach((event) => {
            const startDate = new Date(
              event.startDateTime.year,
              event.startDateTime.month - 1,
              event.startDateTime.day
            );
            const endDate = new Date(
              event.endDateTime.year,
              event.endDateTime.month - 1,
              event.endDateTime.day
            );

            const allEventDates = eachDayOfInterval({
              start: startDate,
              end: endDate,
            });

            allEventDates.forEach((date) => {
              dateEvents.push({
                date: date,
                event: event,
              });
            });
          });

          setEvents(dateEvents.sort((a, b) => a.date - b.date));
        });
      }
    } catch (error) {
      console.error("Error in MyCalendar.jsx > useEffect:", error);
      throw error;
    }
  }, [calendarView]);

  function navigate(direction) {
    try {
      if (calendarView === "month") {
        if (direction === "forward") {
          setNav((curDate) => subMonths(curDate, -1));
        } else if (direction === "prev") {
          setNav((curDate) => subMonths(curDate, 1));
        }
      } else if (calendarView === "week" || calendarView === "work-week") {
        if (direction === "forward") {
          setNav((curDate) => subWeeks(curDate, -1));
        } else if (direction === "prev") {
          setNav((curDate) => subWeeks(curDate, 1));
        }
      } else if (calendarView === "day") {
        if (direction === "forward") {
          setNav((curDate) => subDays(curDate, -1));
        } else if (direction === "prev") {
          setNav((curDate) => subDays(curDate, 1));
        }
      }
    } catch (error) {
      console.error("Error in MyCalendar.jsx > navigate:", error);
      throw error;
    }
  }

  function handleViewChange(e) {
    setCalendarView(e.target.value);
  }

  function renderCalendarView() {
    try {
      switch (calendarView) {
        case "month":
          return <CalendarMonth date={nav} events={events} />;
        case "week":
          return <CalendarWeek date={nav} events={events} />;
        case "work-week":
          return <CalendarWorkWeek date={nav} events={events} />;
        case "day":
          return <CalendarDay date={nav} events={events} />;
        default:
          return <CalendarMonth date={nav} events={events} />;
      }
    } catch (error) {
      console.error("Error in MyCalendar.jsx > renderCalendarView:", error);
      throw error;
    }
  }

  return (
    <div className="event-calendar p-6 min-h-[92%]">
      <div className="calendar-nav flex flex-row items-center justify-between gap-5 mb-5">
        <div className="calendar-nav-left flex flex-row items-center gap-5">
          <h1 className="text-3xl font-bold leading-none">My Calendar</h1>
          <Button onClick={() => setNav(CURRENT_DATE)}>Today</Button>
          <div className="calendar-forward-prev flex flex-row gap-2 items-center">
            <IoChevronBackOutline
              onClick={() => navigate("prev")}
              className="text-2xl cursor-pointer transition hover:scale-125"
            />
            <IoChevronForward
              onClick={() => navigate("forward")}
              className="text-2xl cursor-pointer transition hover:scale-125"
            />
          </div>
          <div className="calendar-month-year flex flex-row items-center gap-2">
            {calendarView !== "month" && (
              <span className="text-2xl font-semibold">
                {`Week ${getWeek(nav, { weekStartsOn: 1 })} (${startOfWeek(
                  nav,
                  { weekStartsOn: 1 }
                )
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${endOfWeek(nav, { weekStartsOn: 1 })
                  .getDate()
                  .toString()
                  .padStart(2, "0")})`}
              </span>
            )}
            <span className="text-2xl font-semibold">
              {nav.toLocaleString("default", { month: "long" })}
            </span>
            <span className="text-2xl font-semibold">{nav.getFullYear()}</span>
          </div>
        </div>
        <div className="calendar-nav-right flex flex-row gap-2 items-center">
          <span className="text-lg font-semibold">View:</span>
          <div className="calendar-view">
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={handleViewChange}
              value={calendarView}
            >
              <option value={"month"}>Month</option>
              <option value={"week"}>Week</option>
              <option value={"work-week"}>Work Week</option>
              <option value={"day"}>Day</option>
            </select>
          </div>
        </div>
      </div>
      <div className="the-calendar bg-base-200 border rounded-2xl overflow-hidden">
        {renderCalendarView()}
      </div>
    </div>
  );
}

export default MyCalendar;

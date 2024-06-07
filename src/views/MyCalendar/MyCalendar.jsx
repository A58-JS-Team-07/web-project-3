import { useState, useContext, useEffect } from "react";
import CalendarMonth from "../../components/Calendar/CalendarMonth/CalendarMonth";
import { CURRENT_DATE } from "../../common/constants";
import Button from "../../components/Button/Button";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";
import { eachDayOfInterval, subMonths } from "date-fns";
import { AppContext } from "../../context/AppContext";
import { getAllEvents } from "../../services/events.service";

function MyCalendar() {
  const { userData } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(CURRENT_DATE);
  const [nav, setNav] = useState(date);
  const [calendarView, setCalendarView] = useState("month");

  useEffect(() => {
    try {
      if (userData) {
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
  }, []);

  console.log("Events: ", events);

  function navigate(direction) {
    if (direction === "forward") {
      setNav((prevNav) => subMonths(prevNav, -1));
    } else if (direction === "prev") {
      setNav((prevNav) => subMonths(prevNav, 1));
    }
  }

  function handleViewChange(e) {
    setCalendarView(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="event-calendar p-6">
      <div className="calendar-nav flex flex-row items-center justify-between gap-5 mb-5">
        <div className="calendar-nav-left flex flex-row items-center gap-5">
          <h1 className="text-3xl font-bold leading-none">My Calendar</h1>
          <Button onClick={() => setNav(date)}>Today</Button>
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
            <h2 className="text-2xl font-semibold">
              {nav.toLocaleString("default", { month: "long" })}
            </h2>
            <h2 className="text-2xl font-semibold">{nav.getFullYear()}</h2>
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
        {calendarView === "month" && (
          <CalendarMonth date={nav} events={events} />
        )}
      </div>
    </div>
  );
}

export default MyCalendar;

import { useEffect, useState } from "react";
import { getAllEvents } from "../../../services/events.service";
import EventCard from "../../../components/Events/EventCard/EventCard";

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        console.log(events);
        setEvents(events);
      } catch (error) {
        console.error("Error in AllEvents > fetchEvents:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events p-6">
      <h1 className="text-3xl font-bold mb-5">All Events</h1>
      <div className="events__listing flex flex-row gap-10">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;

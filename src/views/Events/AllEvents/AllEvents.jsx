import { useEffect, useState } from "react";
import { getAllEvents } from "../../../services/events.service";
import EventCard from "../../../components/Events/EventCard/EventCard";
import { LoaderContext } from "../../../context/LoaderContext";
import { useContext } from "react";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      try {
        const events = await getAllEvents();
        setEvents(events);
        setLoading(false);
      } catch (error) {
        console.error("Error in AllEvents > fetchEvents:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events p-6">
      <h1 className="text-3xl font-bold mb-5">All Events</h1>
      <div className="events__listing grid grid-cols-3 gap-10">
        {events.map((event) => (
          <EventCard key={event.eid} event={event} />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;

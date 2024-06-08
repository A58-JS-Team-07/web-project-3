import { useEffect, useState } from "react";
import { getAllPublicEvents } from "../../../services/events.service";
import EventCard from "../../../components/Events/EventCard/EventCard";
import { LoaderContext } from "../../../context/LoaderContext";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { getAllUserViewEvents } from "../../../services/events.service";
import { useLocation } from "react-router-dom";


function AllEvents() {
  const { userData } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState(null);
  const { setLoading } = useContext(LoaderContext);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      try {
        if (!userData) {
          const publicEvents = await getAllPublicEvents();
          setEvents(publicEvents);
          setLoading(false);
          console.log("AllPublicEvents > fetchEvents > events:", publicEvents);
        } else {
          const userViewEvents = await getAllUserViewEvents(userData.username);
          setEvents(userViewEvents);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in AllEvents > fetchEvents:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (location.state?.searchEvents) {
      setSearchEvents(location.state?.searchEvents);
    }
    console.log("searchEvents:", searchEvents);
  }, [location.state?.searchEvents]);

  return (
    <>
      <div className="events p-6">
        <h1 className="text-3xl font-bold mb-5">All Events</h1>
        <div className="events__listing grid grid-cols-3 gap-10">
          {searchEvents?.length !== 0 && (
            <>
              {searchEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>

          )}
          {searchEvents?.length === 0 && (
            console.log("searchEvents:", searchEvents),
            <>
              <p>No Events found</p>
            </>
          )}
          {!location.state?.searchEvents && (
            <>
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>

          )}
        </div>
      </div>
    </>
  );
}

export default AllEvents;

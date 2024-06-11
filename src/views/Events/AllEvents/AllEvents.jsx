import { useEffect, useState, useContext } from "react";
import {
  getAllPublicEvents,
  getAllUserViewEvents,
  getAllEvents,
} from "../../../services/events.service";
import EventCard from "../../../components/Events/EventCard/EventCard";
import { LoaderContext } from "../../../context/LoaderContext";
import { AppContext } from "../../../context/AppContext";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button/Button";

function AllEvents() {
  const { userData } = useContext(AppContext);
  const [events, setEvents] = useState([]);
  const [searchEvents, setSearchEvents] = useState(null);
  const { setLoading } = useContext(LoaderContext);
  const [visibleEvents, setVisibleEvents] = useState(9);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const fetchEvents = async () => {
      try {
        if (userData?.isAdmin === false) {
          const userViewEvents = await getAllUserViewEvents(userData.username);
          const sortedEvents = userViewEvents.sort((a, b) => {
            const dateA = new Date(
              a.startDateTime.year,
              a.startDateTime.month - 1,
              a.startDateTime.day,
              a.startDateTime.hours,
              a.startDateTime.minutes
            );
            const dateB = new Date(
              b.startDateTime.year,
              b.startDateTime.month - 1,
              b.startDateTime.day,
              b.startDateTime.hours,
              b.startDateTime.minutes
            );

            return dateA - dateB;
          });
          setEvents(sortedEvents);
          setLoading(false);
        } else if (userData?.isAdmin === true) {
          const allEvents = await getAllEvents();
          const sortedEvents = allEvents.sort((a, b) => {
            const dateA = new Date(
              a.startDateTime.year,
              a.startDateTime.month - 1,
              a.startDateTime.day,
              a.startDateTime.hours,
              a.startDateTime.minutes
            );
            const dateB = new Date(
              b.startDateTime.year,
              b.startDateTime.month - 1,
              b.startDateTime.day,
              b.startDateTime.hours,
              b.startDateTime.minutes
            );

            return dateA - dateB;
          });
          setEvents(sortedEvents);
          setLoading(false);
        } else {
          const publicEvents = await getAllPublicEvents();
          const sortedEvents = publicEvents.sort((a, b) => {
            const dateA = new Date(
              a.startDateTime.year,
              a.startDateTime.month - 1,
              a.startDateTime.day,
              a.startDateTime.hours,
              a.startDateTime.minutes
            );
            const dateB = new Date(
              b.startDateTime.year,
              b.startDateTime.month - 1,
              b.startDateTime.day,
              b.startDateTime.hours,
              b.startDateTime.minutes
            );

            return dateA - dateB;
          });
          setEvents(sortedEvents);
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
      <div className="events p-6 min-h-[92%]">
        <h1 className="text-3xl font-bold mb-5">All Events</h1>
        <div className="events__listing grid grid-cols-3 gap-10">
          {searchEvents?.length !== 0 && (
            <>
              {searchEvents?.map((event) => (
                <EventCard key={event.eid} event={event} />
              ))}
            </>
          )}
          {searchEvents?.length === 0 &&
            (console.log("searchEvents:", searchEvents),
            (
              <>
                <p>No Events found</p>
              </>
            ))}
          {!location.state?.searchEvents && (
            <>
              {events.slice(0, visibleEvents).map((event) => (
                <EventCard key={event.eid} event={event} />
              ))}
            </>
          )}
        </div>
        {visibleEvents < events.length && !searchEvents && (
          <div className="load-more flex w-full justify-center mt-8">
            <Button
              onClick={() =>
                setVisibleEvents((prevVisibleEvents) => prevVisibleEvents + 9)
              }
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default AllEvents;

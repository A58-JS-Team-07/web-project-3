import {
  get,
  set,
  update,
  ref,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config.js";
import { createDeleteEventFromUser } from "./users.service";

export const getAllEvents = async () => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val).map((key) => {
        return { id: key, ...val[key] };
      });
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > getAllEvents:", error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    const snapshot = await get(eventRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error(
        "Error in events.services > getEvent > No such event found"
      );
    }
  } catch (error) {
    console.error("Error in events.services > getEvent:", error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const eventRef = await push(ref(db, "events"), eventData);

    await set(ref(db, `events/${eventRef.key}`), {
      ...eventData,
      createdOn: Date.now(),
      eid: eventRef.key,
    });

    await createDeleteEventFromUser(eventData.creator, eventRef.key, true);

    return eventRef.key;
  } catch (error) {
    console.error("Error in events.services > createEvent:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    await update(eventRef, eventData);
  } catch (error) {
    console.error("Error in events.services > updateEvent", error);
    throw error;
  }
};

export const deleteEvent = async (eventData) => {
  try {
    const eventRef = ref(db, `events/${eventData.eid}`);
    await set(eventRef, null);
    await createDeleteEventFromUser(eventData.creator, eventData.eid, null);
  } catch (error) {
    console.error("Error in events.services > deleteEvent", error);
    throw error;
  }
};

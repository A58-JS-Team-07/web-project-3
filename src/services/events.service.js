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

export const getEvents = async () => {};

export const uploadEvent = async (eventData) => {
  try {
    const eventRef = await push(ref(db, "events"), eventData);
    return eventRef.key;
  } catch {
    console.error("Error uploading event:", error);
  }
};

export const getEvent = async (eventId) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    const snapshot = await get(eventRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No such event found");
    }
  } catch (error) {
    console.error("Error getting event:", error);
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    await update(eventRef, eventData);
  } catch (error) {
    console.error("Error updating event:", error);
  }
};

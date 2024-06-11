import {
  get,
  set,
  update,
  ref,
  push,
  remove,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config.js";
import { createEventToUser, deleteEventFromUser } from "./users.service";
import { deleteEventImage } from "./storage.service";
import { deleteInvite } from "./invites.service";

export const getAllEvents = async () => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val).map((key) => {
        return { eid: key, ...val[key] };
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

export const getAllPublicEvents = async () => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .filter(event => event.isPrivate === false);
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > getAllPublicEvents:", error);
    throw error;
  }
};

export const searchPublicEvents = async (searchTerm) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .filter(event => event.isPrivate === false &&
          event.title.toLowerCase().includes(searchTerm));
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchPublicEvents:", error);
    throw error;
  }
};

export const searchAdminViewEvents = async (searchTerm) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .filter(event => event.title.toLowerCase().includes(searchTerm));
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchAdminViewEvents:", error);
    throw error;
  }
};

export const searchUserViewEvents = async (searchTerm, username) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);
    // console.log(username);


    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .filter(event => (
          (event.creator === username
            || event?.participants[username] === true
            || event.isPrivate === false)
          && event.title.toLowerCase().includes(searchTerm)));
      console.log("events:", events);
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchUserViewEvents:", error);
    throw error;
  }
};

export const getAllUserViewEvents = async (username) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);
    console.log(username);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .filter(event => event.creator === username 
          || event?.participants[username] === true 
          || event.isPrivate === false);
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > getAllPublicEvents:", error);
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

    await createEventToUser(eventData.creator, eventRef.key);

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

//TODO: when delete as admin get event by ID first and pass it to deleteEvent
export const deleteEvent = async (eventData) => {
  try {
    const participants = Object.keys(eventData.participants);
    console.log("participants: ", participants);
    console.log(typeof participants, participants.length);

    participants.forEach(async (participant) => {
      console.log("participant: ", participant);
      deleteEventFromUser(participant, eventData.eid);
    });

    await set(ref(db, `events/${eventData.eid}`), null);
    await deleteEventImage(eventData.eid);
  } catch (error) {
    console.error("Error in events.services > deleteEvent", error);
    throw error;
  }
};

export const joinEvent = async (username, eventId) => {
  try {
    await update(ref(db, `users/${username}/participatingEvents`), {
      [eventId]: true,
    });
    await update(ref(db, `events/${eventId}/participants`), {
      [username]: true,
    });
  } catch (error) {
    console.error("Error in users.services > joinEvent", error);
    throw error;
  }
};

export const leaveEvent = async (username, eventId, invitedUsers) => {
  try {
    await remove(ref(db, `users/${username}/participatingEvents/${eventId}`));
    await remove(ref(db, `events/${eventId}/participants/${username}`));

    if (invitedUsers) {
      Object.keys(invitedUsers[eventId]).forEach(async (invitedUser) => {
        console.log("deleteInvite: ", invitedUser);
        await deleteInvite(eventId, username, invitedUser);
      });
    }
  } catch (error) {
    console.error("Error in users.services > leaveEvent", error);
    throw error;
  }
};

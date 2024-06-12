import { get, set, update, ref, push, remove } from "firebase/database";
import { db } from "../config/firebase-config.js";
import { createEventToUser, deleteEventFromUser } from "./users.service";
import { deleteEventImage } from "./storage.service";
import { deleteInvite } from "./invites.service";

/**
 * Get all events from the database.
 *
 * @returns snapshot array of all events
 */

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

/**
 * Get all public events from the database.
 *
 * @returns snapshot array of all public events
 */

export const getAllPublicEvents = async () => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map((key) => ({ id: key, ...val[key] }))
        .filter((event) => event.isPrivate === false);
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > getAllPublicEvents:", error);
    throw error;
  }
};

/**
 * Search public events from the database and return the filtered public events. Use for non-logged in users.
 *
 * @param {string} searchTerm - The search term to filter the events.
 * @returns  snapshot array of all public events that match the search term.
 */

export const searchPublicEvents = async (searchTerm) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map((key) => ({ id: key, ...val[key] }))
        .filter(
          (event) =>
            event.isPrivate === false &&
            event.title.toLowerCase().includes(searchTerm)
        );
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchPublicEvents:", error);
    throw error;
  }
};

/**
 * Search events from the database and return the filtered public and private events.
 *
 * @param {string} searchTerm - The search term to filter the events.
 * @returns snapshot array of all public and private events that match the search term.
 */

export const searchAdminViewEvents = async (searchTerm) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map((key) => ({ id: key, ...val[key] }))
        .filter((event) => event.title.toLowerCase().includes(searchTerm));
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchAdminViewEvents:", error);
    throw error;
  }
};

/**
 * Search events from the database and return the filtered events that particular user can see.
 *
 * @param {string} searchTerm - The search term to filter the events.
 * @param {string} username - The username to filter the events.
 * @returns snapshot array of all events that match the search term.
 */

export const searchUserViewEvents = async (searchTerm, username) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);
    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map((key) => ({ id: key, ...val[key] }))
        .filter(
          (event) =>
            (event.creator === username ||
              event?.participants[username] === true ||
              event.isPrivate === false) &&
            event.title.toLowerCase().includes(searchTerm)
        );
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > searchUserViewEvents:", error);
    throw error;
  }
};

/**
 * Get all events that a particular user can see.
 *
 * @param {string} username - The username to filter the events.
 * @returns snapshot array of all events that the user can see.
 */

export const getAllUserViewEvents = async (username) => {
  try {
    const eventsRef = ref(db, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const val = snapshot.val();
      const events = Object.keys(val)
        .map((key) => ({ id: key, ...val[key] }))
        .filter(
          (event) =>
            event.creator === username ||
            event?.participants[username] === true ||
            event.isPrivate === false
        );
      return events;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error in events.services > getAllPublicEvents:", error);
    throw error;
  }
};

/**
 * Get event snapshot with the given event ID.
 *
 * @param {string} eventId - The event ID to get the event.
 * @returns snapshot of the event with the given event ID.
 */

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

/**
 *  Create a new event in the database.
 *
 * @param {object} eventData - The event data to create the event.
 * @returns event ID of the created event.
 */

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

/**
 * Update an existing event in the database.
 *
 * @param {string} eventId - The event ID to update the event.
 * @param {object} eventData - The event data to update the event.
 */

export const updateEvent = async (eventId, eventData) => {
  try {
    const eventRef = ref(db, `events/${eventId}`);
    await update(eventRef, eventData);
  } catch (error) {
    console.error("Error in events.services > updateEvent", error);
    throw error;
  }
};

/**
 * Delete an existing event from the database.
 *
 * @param {object} eventData - The event data to delete the event.
 */

export const deleteEvent = async (eventData) => {
  try {
    const participants = Object.keys(eventData.participants);
    participants.forEach(async (participant) => {
      deleteEventFromUser(participant, eventData.eid);
    });
    await set(ref(db, `events/${eventData.eid}`), null);
    await deleteEventImage(eventData.eid);
  } catch (error) {
    console.error("Error in events.services > deleteEvent", error);
    throw error;
  }
};

/**
 * User join an existing event in the database.
 *
 * @param {string} username - The username to join the event.
 * @param {string} eventId - The event ID to join the event by user.
 */

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

/**
 * User leave an existing event in the database.
 *
 * @param {string} username - The username to leave the event.
 * @param {string} eventId - The event ID to leave the event by user.
 * @param {object} invitedUsers - The invited users to the event to automatically remove all invites for the particular event.
 */

export const leaveEvent = async (username, eventId, invitedUsers) => {
  try {
    await remove(ref(db, `users/${username}/participatingEvents/${eventId}`));
    await remove(ref(db, `events/${eventId}/participants/${username}`));

    if (invitedUsers) {
      Object.keys(invitedUsers[eventId]).forEach(async (invitedUser) => {
        await deleteInvite(eventId, username, invitedUser);
      });
    }
  } catch (error) {
    console.error("Error in users.services > leaveEvent", error);
    throw error;
  }
};

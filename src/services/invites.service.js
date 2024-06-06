import {
  get,
  set,
  update,
  ref,
  remove,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { db } from "../config/firebase-config.js";

/**
 * Creates an invite for each user in the invitedUsers array.
 *
 * @param {string} eventId - The ID of the event.
 * @param {string} inviterUser - The username of the user who is creating the invites.
 * @param {string} invitedUsers - The username of the users who are being invited.
 * @returns void - Only updates the database with the new invites.
 */
export const inviteUsers = async (eventId, inviterUser, invitedUser) => {
  // Update inviter 'isInviting object' with 'eventId objects' filled with invited users usernames
  // Update invited user 'beingInvited object' with 'eventId object' filled with inviter username

  try {
    await update(ref(db, `users/${inviterUser}/isInviting/${eventId}`), {
      [invitedUser]: true,
    });
    await update(ref(db, `users/${invitedUser}/beingInvited/${eventId}`), {
      [inviterUser]: true,
    });
  } catch (error) {
    console.error("Error in invites.services > inviteUsers:", error);
    throw error;
  }
};

export const deleteInvite = async (eventId, inviterUser, invitedUser) => {
  try {
    await remove(
      ref(db, `users/${inviterUser}/isInviting/${eventId}/${invitedUser}`)
    );
    await remove(
      ref(db, `users/${invitedUser}/beingInvited/${eventId}/${inviterUser}`)
    );
  } catch (error) {
    console.error("Error in invites.services > deleteInvite:", error);
    throw error;
  }
};

export const acceptInvite = async (eventId, inviterUser, invitedUser) => {
  try {
    await update(ref(db, `events/${eventId}/participants/`), {
      [invitedUser]: true,
    });
    await update(ref(db, `users/${invitedUser}/participatingEvents/`), {
      [eventId]: true,
    });
    await remove(
      ref(db, `users/${inviterUser}/isInviting/${eventId}/${invitedUser}`)
    );
    await remove(
      ref(db, `users/${invitedUser}/beingInvited/${eventId}/${inviterUser}`)
    );
  } catch (error) {
    console.error("Error in invites.services > acceptInvite:", error);
    throw error;
  }
};

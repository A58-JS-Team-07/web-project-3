import { updateUserAvatar } from "./users.service";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase-config";

/**
 * Uploads an event image to the storage.
 *
 * @param {File} file - The image file to upload.
 * @param {string} eventId - The ID of the event.
 * @returns {string} - The URL of the uploaded image.
 */

export const uploadEventImage = async (file, eventId) => {
  try {
    const fileRef = ref(storage, `events/${eventId}.png`);

    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    return photoURL;
  } catch (error) {
    console.error("Error storage.services > uploadEventImage", error.message);
    throw error;
  }
};

/**
 * Retrieves an event image from the storage.
 *
 * @param {string} eventId - The ID of the event.
 * @returns {string} - The URL of the event image.
 */

export const getEventImage = async (eventId) => {
  try {
    const fileRef = ref(storage, `events/${eventId}.png`);
    return getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error storage.services > getEventImage:", error.message);
    throw error;
  }
};

/**
 * Deletes an event image from the storage.
 *
 * @param {string} eventId - The ID of the event.
 */

export const deleteEventImage = async (eventId) => {
  try {
    const fileRef = ref(storage, `events/${eventId}.png`);
    await deleteObject(fileRef);
  } catch (error) {
    console.error("Error storage.services > deleteEventImage:", error.message);
    throw error;
  }
};

/**
 * Uploads a user avatar to the storage.
 *
 * @param {File} file - The image file to upload.
 * @param {object} user - The user object.
 * @returns {string} - The URL of the uploaded image.
 */

export const uploadAvatar = async (file, user) => {
  try {
    const fileRef = ref(storage, `avatars/${user.uid}.png`);

    await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);
    await updateUserAvatar(user.username, photoURL);

    return photoURL;
  } catch (error) {
    console.error("Error uploading user avatar:", error.message);
    throw error;
  }
};

import { updateProfile } from "firebase/auth";
import { updateUserAvatar } from "./users.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase-config";

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

export const getEventImage = async (eventId) => {
  try {
    const fileRef = ref(storage, `events/${eventId}.png`);
    return getDownloadURL(fileRef);
  } catch (error) {
    console.error("Error storage.services > getEventImage:", error.message);
    throw error;
  }
};

export const uploadAvatar = async (file, user) => {
  try {
    const fileRef = ref(storage, `avatars/${user.uid}.png`);

    await uploadBytes(fileRef, file);

    const photoURL = await getDownloadURL(fileRef);
    await updateUserAvatar(user.username, photoURL);

    return photoURL;
  } 
  catch (error) {
    console.error("Error uploading user avatar:", error.message);
    throw error;
  }
};

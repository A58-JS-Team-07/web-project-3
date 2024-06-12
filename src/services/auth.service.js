import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase-config.js";

/**
 * Registers a new user with the provided email and password to the Firebase authentication.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */

export const registerUser = (email, password) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error registering a user:" + error);
  }
};

/**
 * Logs in a user with the provided email and password to the Firebase authentication.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */

export const loginUser = (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in a user:" + error);
  }
};

/**
 * Logs out the current user from the Firebase authentication.
 *
 * @returns {Promise<void>} - A promise that resolves when the user is logged out.
 */

export const logoutUser = () => {
  try {
    return signOut(auth);
  } catch (error) {
    console.error("Error logging out:" + error);
  }
};

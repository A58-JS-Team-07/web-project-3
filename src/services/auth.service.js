import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config.js";

export const registerUser = (email, password) => {
    try {
        return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Error registering a user:' + error);
    }
};

export const loginUser = (email, password) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error('Error signing in a user:' + error);
    }
};

export const logoutUser = () => {
    try {
        return signOut(auth);
    } catch (error) {
        console.error('Error logging out:' + error);
    }
};
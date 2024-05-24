import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config.js";

export const registerUser = (email, password) => {
    try {
        return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error('Error registering a user:' + error);
    }
};

export const loginUser = (email, password) => {
    try {
        return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error('Error signing in a user:' + error);
    }
};

export const logoutUser = () => {
    try {
        return signOut(auth);
    } catch (error) {
        throw new Error('Error logging out:' + error);
    }
};
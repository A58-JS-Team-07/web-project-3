// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { VITE_FIREBASE_API_KEY, VITE_FIREBASE_DATABASE_URL } from "../common/constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "telerik-project-3.firebaseapp.com",
  projectId: "telerik-project-3",
  storageBucket: "telerik-project-3.appspot.com",
  messagingSenderId: "459153028848",
  appId: "1:459153028848:web:e4db7808a7d0c05bdcb435",
  databaseURL: VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
// the Firebase storage handler
export const storage = getStorage(app);

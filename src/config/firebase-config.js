// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { FIREBASE_API_KEY, FIREBASE_DATABASE_URL } from "../common/constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "telerik-project-3-private.firebaseapp.com",
  projectId: "telerik-project-3-private",
  storageBucket: "telerik-project-3-private.appspot.com",
  messagingSenderId: "518873321752",
  appId: "1:518873321752:web:012d74eeabacce02ef4e6d",
  databaseURL: FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);
// the Firebase storage handler
export const storage = getStorage(app);

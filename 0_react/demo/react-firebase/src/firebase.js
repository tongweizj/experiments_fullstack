// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUBI56oHD2lDW4gdKAs5_jZVdarf7X3XU",
  authDomain: "fir-react-firebase-95ca9.firebaseapp.com",
  projectId: "fir-react-firebase-95ca9",
  storageBucket: "fir-react-firebase-95ca9.appspot.com",
  messagingSenderId: "71659329640",
  appId: "1:71659329640:web:a07e6cf5464b62949d43dd",
  measurementId: "G-9TCE3R80MK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const countCollection = collection(db, "count");

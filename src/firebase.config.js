import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO-XC-e4ItY7H4p1Lth3q-NFaKLXhtmWY",
  authDomain: "ecomerce-ebb9e.firebaseapp.com",
  projectId: "ecomerce-ebb9e",
  storageBucket: "ecomerce-ebb9e.appspot.com",
  messagingSenderId: "393875020263",
  appId: "1:393875020263:web:6b143829de5285d1610542",
  measurementId: "G-E65HF117KS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);

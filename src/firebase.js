import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZHz8HNhrhKnfNIoY5of1W9DHc_o9Se74",
  authDomain: "travel-srilanka-v1.firebaseapp.com",
  projectId: "travel-srilanka-v1",
  storageBucket: "travel-srilanka-v1.firebasestorage.app",
  messagingSenderId: "1046563448706",
  appId: "1:1046563448706:web:3d86ba83e7b454a087919b",
  measurementId: "G-CY5ZM0Z6H3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

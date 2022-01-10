// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAH0lRjYdVrZesnQrFZJ3w6QAx4YjiEjg",
  authDomain: "fir-2662d.firebaseapp.com",
  projectId: "fir-2662d",
  storageBucket: "fir-2662d.appspot.com",
  messagingSenderId: "585152132502",
  appId: "1:585152132502:web:ae43254f013a34887219b7",
  measurementId: "G-7RWECEXWB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();

export default app


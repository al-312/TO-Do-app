import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADAJ0BSPIzo3OtQIzdzAbcCRN7XbUNqK8",
  authDomain: "my-task-976b6.firebaseapp.com",
  projectId: "my-task-976b6",
  storageBucket: "my-task-976b6.firebasestorage.app",
  messagingSenderId: "61983179499",
  appId: "1:61983179499:web:71e2a8661ae54162d9b4ae",
  measurementId: "G-8ETC22K2Q5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADAJ0BSPIzo3OtQIzdzAbcCRN7XbUNqK8",
  authDomain: "my-task-976b6.firebaseapp.com",
  projectId: "my-task-976b6",
  storageBucket: "my-task-976b6.appspot.com",
  messagingSenderId: "61983179499",
  appId: "1:61983179499:web:71e2a8661ae54162d9b4ae",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth, db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGqU7HCAOcOahyg8z07mERuL8H9MxM31M",
  authDomain: "getpost-f3eae.firebaseapp.com",
  databaseURL:
    "https://getpost-f3eae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "getpost-f3eae",
  storageBucket: "getpost-f3eae.appspot.com",
  messagingSenderId: "886964973080",
  appId: "1:886964973080:web:ea5ea3c3a028766e599d6d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

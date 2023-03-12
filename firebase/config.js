// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { collection, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi7jg2PxxrRQFPqtPccTmmGuW3mmG_bXA",
  authDomain: "sparkfire-d0f6c.firebaseapp.com",
  projectId: "sparkfire-d0f6c",
  storageBucket: "sparkfire-d0f6c.appspot.com",
  messagingSenderId: "594288236029",
  appId: "1:594288236029:web:34f9ef3b6a59b9394ff594"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = initializeFirestore(app, { experimentalForceLongPolling: true});
export const userRef = collection(db, "Users");
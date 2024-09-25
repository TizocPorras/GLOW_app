// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJeFFCPV_JvKxXhUpbrnEsTfM2kSJVggM",
  authDomain: "glow-52d20.firebaseapp.com",
  projectId: "glow-52d20",
  storageBucket: "glow-52d20.appspot.com",
  messagingSenderId: "37105930437",
  appId: "1:37105930437:web:4c5f2b539fbfa549e420ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializa Firebase Authentication
const auth = getAuth(app);
const db = getFirestore(app);

export { auth };
export { db };
// config/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Optional: Only if you use Analytics
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwurkNoiA9_bFLl7rXMzx0eLo05cqNAxk",
  authDomain: "beef-7a2eb.firebaseapp.com",
  projectId: "beef-7a2eb",
  storageBucket: "beef-7a2eb.appspot.com",
  messagingSenderId: "67424360221",
  appId: "1:67424360221:web:f7f52a5f886d29c15fb3f4",
  measurementId: "G-S292N6R9VE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (Optional)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

// Export the initialized services
export { auth, firestore, analytics };

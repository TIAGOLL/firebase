// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvTpEEoOwEeAvaelolqRoL9-Osw6zpfJM",
  authDomain: "db-react-37a61.firebaseapp.com",
  projectId: "db-react-37a61",
  storageBucket: "db-react-37a61.appspot.com",
  messagingSenderId: "1031695560954",
  appId: "1:1031695560954:web:c4e7a1db83a9d71f0fd943"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
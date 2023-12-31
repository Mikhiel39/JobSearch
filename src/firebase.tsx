// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
import {getFirestore} from "firebase/firestore"
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmtoVkUN3aCBI3KhiOKx1ggLpmKykE-tA",
  authDomain: "jobsearch-c3504.firebaseapp.com",
  projectId: "jobsearch-c3504",
  storageBucket: "jobsearch-c3504.appspot.com",
  messagingSenderId: "755425225481",
  appId: "1:755425225481:web:7b7788e4a405c91874c1d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth,app };
export default getFirestore(app);

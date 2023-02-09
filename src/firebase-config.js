// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0-yXI6OEZv_xtjntEwyqTbVOZLQ6Y62w",
  authDomain: "dev-auth-dbd81.firebaseapp.com",
  projectId: "dev-auth-dbd81",
  storageBucket: "dev-auth-dbd81.appspot.com",
  messagingSenderId: "448241492847",
  appId: "1:448241492847:web:55846ed28e2a427dd13e9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app); 
export const db = getFirestore(app); 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeckZALSnjEY4E632tjCqK_GbEdfjxnO8",
  authDomain: "bakas-store.firebaseapp.com",
  projectId: "bakas-store",
  storageBucket: "bakas-store.firebasestorage.app",
  messagingSenderId: "983859318869",
  appId: "1:983859318869:web:c1710a730ffc35ad63c4dc",
  measurementId: "G-509CGWQG2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
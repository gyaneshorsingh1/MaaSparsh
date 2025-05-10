// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBX8WR3tAOR12YJO5W1COGCcwNOVQMZnk",
  authDomain: "maasparsh-c83e4.firebaseapp.com",
  projectId: "maasparsh-c83e4",
  storageBucket: "maasparsh-c83e4.firebasestorage.app",
  messagingSenderId: "258321020737",
  appId: "1:258321020737:web:5df5f41bf7d4acc6dfd3c0",
  measurementId: "G-X0CXGM9VZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export {auth, provider};
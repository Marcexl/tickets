import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzuyH9BHl93tGo0K0M-O4X58-BXBI5Jw4",
  authDomain: "tickets-react-7c079.firebaseapp.com",
  projectId: "tickets-react-7c079",
  storageBucket: "tickets-react-7c079.appspot.com",
  messagingSenderId: "40657612295",
  appId: "1:40657612295:web:a378584cde2ad2b0c204a2",
  measurementId: "G-00J04KEQRQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

export {app, auth, db}
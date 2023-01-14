import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//var urlMaster = 'http://localhost:3000/';
var urlMaster = 'https://marcexl.com.ar/app/30aniversario/';

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

const provider = new GoogleAuthProvider();
const authGoogle = getAuth();

const signInWithGoogle = () =>{ 
  let spinner = document.getElementById("spinner");
  let salert = document.getElementById("success-alert");
  let dalert = document.getElementById("danger-alert");

  spinner.style.display = 'block';
  signInWithPopup(authGoogle, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      // The signed-in user info.
      //const user = result.user;
      // ...
      const userID = result.user.uid;
      localStorage.setItem('userId',userID);
      setTimeout(() => {
        spinner.style.display = 'none';
        salert.style.display = 'block';
        setTimeout(() => {
          window.location.href = `${urlMaster}#/eventos`;
        },800);
      },800);

    }).catch((error) => {
      // Handle Errors here.
      //const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      //const email = error.customData.email;
      // The AuthCredential type that was used.
      //const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      setTimeout(() => {
        spinner.style.display = 'none';
        dalert.style.display = 'block';
        dalert.innerHTML = errorMessage;
      },1000);
  });
}

export {app, auth, db, signInWithGoogle}
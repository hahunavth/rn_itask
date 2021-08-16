import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
// import "firebase/database";
// import "firebase/functions";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsFEMS3AgN7kjuO4VV7pj6T4PJ-d9rYhA",
  authDomain: "rn-itask.firebaseapp.com",
  projectId: "rn-itask",
  storageBucket: "rn-itask.appspot.com",
  messagingSenderId: "53558603978",
  appId: "1:53558603978:web:0f93171a69b53580080433",
  measurementId: "G-7L74WMX60W"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;

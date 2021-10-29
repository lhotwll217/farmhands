import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyACqkWDy55u2YFE-StIUMMsRBDWUxkk6Kg",
  authDomain: "farmhandscourse.firebaseapp.com",
  projectId: "farmhandscourse",
  storageBucket: "farmhandscourse.appspot.com",
  messagingSenderId: "984062980230",
  appId: "1:984062980230:web:891166ce6389129241a107",
  measurementId: "G-2L4VF0RJ90",
  databaseURL: "https://farmhandscourse-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

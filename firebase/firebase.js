import firebase from 'firebase/app';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "united-medi-care.firebaseapp.com",
  databaseURL: "https://united-medi-care.firebaseio.com",
  projectId: "united-medi-care",
  storageBucket: "united-medi-care.appspot.com",
  messagingSenderId: "498460757969",
  appId: "1:498460757969:web:bf6b027fa128bf21a0daf0",
  measurementId: "G-J8QC9646SQ"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export {
  storage, firebase as default
}

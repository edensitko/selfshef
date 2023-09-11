import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCpkMJOJpFNgW8_odp2-HWp4fKrSfM0wSA",
    authDomain: "self-shef.firebaseapp.com",
    projectId: "self-shef",
    storageBucket: "self-shef.appspot.com",
    messagingSenderId: "899269221480",
    appId: "1:899269221480:web:bb91238b4b666a3799efdd",
    measurementId: "G-ZLH75J1XP7"
  };

  firebase.initializeApp(firebaseConfig)

  const firestoreProj = firebase.firestore()

  export {firestoreProj}
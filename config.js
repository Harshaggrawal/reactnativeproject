import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD71rnRdElQWB3iSi_v6cAOwh_uL9pEGXM",
  authDomain: "communication-app-7219b.firebaseapp.com",
  databaseURL: "https://communication-app-7219b-default-rtdb.firebaseio.com",
  projectId: "communication-app-7219b",
  storageBucket: "communication-app-7219b.appspot.com",
  messagingSenderId: "643399964469",
  appId: "1:643399964469:web:fdc92be90d76f165fc1e7c",
  measurementId: "G-B63SHVQE3B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
export { database };
import firebase from 'firebase/compat/app'
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyDSraQHflIjXJIpxkmVIzgqMCbVPyWVgwc",
  authDomain: "manjaro-web-dae38.firebaseapp.com",
  databaseURL: "https://manjaro-web-dae38-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "manjaro-web-dae38",
  storageBucket: "manjaro-web-dae38.appspot.com",
  messagingSenderId: "932426190952",
  appId: "1:932426190952:web:6f43e64adcd18330e06bdd"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database()
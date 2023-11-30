import firebase from 'firebase/compat/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import "firebase/compat/database"

const firebaseConfig = {
  apiKey: "AIzaSyCOfO_2a6Ri7p8e23Ri2nMNYzVegNj__fQ",
  authDomain: "manjaro-web-61a29.firebaseapp.com",
  databaseURL: "https://manjaro-web-61a29-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "manjaro-web-61a29",
  storageBucket: "manjaro-web-61a29.appspot.com",
  messagingSenderId: "1012323771930",
  appId: "1:1012323771930:web:c99e480f674353dd7493a3"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(fireDb)
export const auth = getAuth(fireDb)
export default fireDb.database()
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD3yRQAKl7YlCgktp8eBebg9qUMQzawkZA",
  authDomain: "foodyadmin-a0da0.firebaseapp.com",
  projectId: "foodyadmin-a0da0",
  storageBucket: "foodyadmin-a0da0.appspot.com",
  messagingSenderId: "1061649061643",
  appId: "1:1061649061643:web:7932f7617175a1926ef40e",
  measurementId: "G-71R5HHG8S5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)

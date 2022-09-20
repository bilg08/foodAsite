import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCDcd8S34wRMmMauMz_Z3KtkfVhAk1gejI",
  authDomain: "adminforfoodsite-6bc3f.firebaseapp.com",
  projectId: "adminforfoodsite-6bc3f",
  storageBucket: "adminforfoodsite-6bc3f.appspot.com",
  messagingSenderId: "195328802961",
  appId: "1:195328802961:web:17e167470ef1514538ff30",
  measurementId: "G-LJ97F6TJC4",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage=getStorage(app)

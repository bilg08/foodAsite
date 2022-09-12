import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseForThisProject/firebase";

export const setDocToFirebase = async (path, data) => {
  await setDoc(doc(db, path), data, { merge: true });
};

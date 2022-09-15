import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseForThisProject/firebase";

export const setDocToFirebase = async (path, data) => {
  await setDoc(doc(db, path), data, { merge: true }).then(async() => {
    console.log("ilgeesen setDocToFirebase", data, path);
    const a = await getDoc(doc(db,path)); 
    console.log(a.data(),'getDoc')
  }
  );
};

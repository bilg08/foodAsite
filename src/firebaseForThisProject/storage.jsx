import { storage } from "./firebase";
import { getStorage,getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { useFoodsDatasContext } from "../context/foodsContext";

export const uploadImageToFirebase = (file, foodName) => {
    const storageRef = sRef(storage, `foods/${foodName}`); 
    uploadBytes(storageRef, file)
        .then(async (snapshot) => {            
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
            })
    })
      .catch((err) => console.log(err));
}

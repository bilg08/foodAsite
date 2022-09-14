import { storage } from "./firebase";
import { getStorage,getDownloadURL, ref as sRef, uploadBytes } from "firebase/storage";
import { useFoodsDatasContext } from "../context/foodsContext";
import { setDocToFirebase } from "./setDoc";

export const uploadImageToFirebase = async(file, foodName) => {
    const storageRef = sRef(storage, `foods/${foodName}`); 
    await uploadBytes(storageRef, file)
        .then(async (snapshot) => {   
            await getDownloadURL(snapshot.ref).then(async (url) => {
                console.log(url)
                await setDocToFirebase(`foods/${foodName}`, {
                    img:url
                }).then((alert('Амжилттай хадгаллаа')));
            })
    })
      .catch((err) => console.log(err));
}

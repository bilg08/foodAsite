import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

export const deleteFileFromFirebaseStorage = (path) => {
    const reference = ref(storage, path);
    deleteObject(reference)
      .then(() => {
        alert("zurag ustgalaa");
      })
      .catch((error) => {});
}
import { firebaseStorage } from "../config/firebase";
import { Photo } from "./users.type";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const uploadImage = async (
  image: Photo | null
): Promise<string | null> => {
  try {
    const filename = self.crypto.randomUUID();
    const imageRaw = image?.raw;

    if (imageRaw) {
      const storageRef = ref(firebaseStorage, `users/${filename}.jpg`);
      await uploadBytesResumable(storageRef, imageRaw);
      const downloadURL = await getDownloadURL(storageRef);
      console.log("File available at", downloadURL);
      return downloadURL;
    }

    return "";
  } catch (error) {
    console.error("Error uploading image: ", error);
    return "";
  }
};

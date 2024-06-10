import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getCountFromServer,
  getDocs,
  getDoc,
  where,
  serverTimestamp,
  setDoc,
  query,
  limit,
} from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../config/firebase";
import { Photo, Users } from "./users.type";
import { createUserLink } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import revalidateUserPath from "./user.revalidate";

type UserCodeLink = {
  userCode: string;
  user_link: string;
};
export const addUser = async (
  user: Omit<Users, "user_link">
): Promise<UserCodeLink | null> => {
  try {
    const userCollection = collection(firebaseDb, "users");

    const snapshot = await getCountFromServer(userCollection);
    const totalUsers = snapshot.data().count;
    let userCode = "",
      user_link = "";
    if (totalUsers >= 0) {
      // get last 4 characters of the docRef.id

      const docRef = await addDoc(userCollection, {
        ...user,
        createdAt: serverTimestamp(),
      });
      const sub_id = docRef.id.slice(-3);
      const full_id = docRef.id;

      userCode = (totalUsers + 1).toString() + sub_id;

      // update the user with the final_subId
      const userRef = doc(userCollection, docRef.id);
      await updateDoc(userRef, { userCode, id: full_id });
    }
    console.log("Document written with ID: ", userCode, user_link);

    const userCodeLink = {
      userCode,
      user_link,
    };
    revalidateUserPath("/users");
    return userCodeLink;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
};

// get all users from the database
export const getAllUsers = async (): Promise<Users[]> => {
  try {
    const userCollection = collection(firebaseDb, "users");
    const snapshot = await getDocs(userCollection);
    const users: Users[] = snapshot.docs.map((doc) => doc.data() as Users);
    // change link to user_link
    users.forEach(async (user) => {
      user.user_link = await createUserLink(user.userCode ?? "");
    });
    return users;
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
};

export const updateUserById = async (
  user_id: string,
  user: Partial<Users>
): Promise<{ success: boolean; message: any }> => {
  try {
    const userCollection = collection(firebaseDb, "users");
    const userRef = doc(userCollection, user_id);
    await setDoc(userRef, { ...user }, { merge: true });
    console.log("Document updated with ID: ", user_id);
    revalidateUserPath("/users");
    return { success: true, message: `Document updated with ID: ${user_id}` };
  } catch (error: any) {
    console.error("Error updating document: ", error);
    return { success: false, message: error };
  }
};
export const getUserBySubId = async (id: string): Promise<Users | null> => {
  try {
    const userRef = doc(firebaseDb, "users", id);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const user = docSnap.data() as Users;
      return user;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};

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

export const updateUserPrintStatusById = async (id: string): Promise<void> => {
  try {
    const userCollection = collection(firebaseDb, "users");
    const userRef = doc(userCollection, id);
    await updateDoc(userRef, { printStatus: true });
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const getUserDataByUserCode = async (
  userCode: string
): Promise<Users | null> => {
  try {
    const userCol = collection(firebaseDb, "users");
    const q = query(userCol, where("userCode", "==", userCode), limit(1));
    const document = await getDocs(q);
    if (document.empty) {
      return null;
    }
    const result: Users[] = [];
    document.forEach((doc) => {
      result.push(doc.data() as Users);
    });
    if (result.length === 0) {
      return null;
    }

    const link = await createUserLink(userCode);
    const finalData = {
      ...result[0],
      user_link: link,
    };
    return finalData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

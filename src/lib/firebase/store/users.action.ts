import {
	collection,
	addDoc,
	doc,
	getFirestore,
	updateDoc,
	getCountFromServer,
	getDocs,
	serverTimestamp,
} from "firebase/firestore";
import { firebaseDb, firebaseStorage } from "../config/firebase";
import { Photo, Users } from "./users.type";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
export const addUser = async (user: Users): Promise<string | null> => {
	try {
		const userCollection = collection(firebaseDb, "users");

		const snapshot = await getCountFromServer(userCollection);
		const totalUsers = snapshot.data().count;
		let final_subId = "",
			user_link = "";
		if (totalUsers >= 0) {
			// get last 4 characters of the docRef.id
			const docRef = await addDoc(userCollection, {
				...user,
				createdAt: serverTimestamp(),
			});
			const id = docRef.id.slice(-3);
			final_subId = (totalUsers + 1).toString() + id;

			// update the user with the final_subId
			const userRef = doc(userCollection, docRef.id);
			const link = window.location.href;
			user_link = `${link}${final_subId}`;
			await updateDoc(userRef, { subId: final_subId, user_link });
		}
		console.log("users", user);
		// get the current link

		// return the link with the final_subId
		return user_link;
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
		return users;
	} catch (error) {
		console.error("Error getting documents: ", error);
		return [];
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
// TODO update user by id

// TODO get user by subId

// TODO update user print status

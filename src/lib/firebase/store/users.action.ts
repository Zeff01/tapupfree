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
import firebaseDb from "../config/firebase";
import { Users } from "./users.type";

export const addUser = async (user: Users): Promise<string | null> => {
	try {
		const db = getFirestore(firebaseDb);
		const userCollection = collection(db, "users");

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
		const db = getFirestore(firebaseDb);
		const userCollection = collection(db, "users");
		const snapshot = await getDocs(userCollection);
		const users: Users[] = snapshot.docs.map((doc) => doc.data() as Users);
		return users;
	} catch (error) {
		console.error("Error getting documents: ", error);
		return [];
	}
};

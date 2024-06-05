import {
	collection,
	addDoc,
	doc,
	getFirestore,
	updateDoc,
	getCountFromServer,
} from "firebase/firestore";
import firebaseDb from "../config/firebase";
import { Users } from "./users.type";

export const addUser = async (user: Users): Promise<string | null> => {
	try {
		const db = getFirestore(firebaseDb);
		const userCollection = collection(db, "users");

		const snapshot = await getCountFromServer(userCollection);
		const totalUsers = snapshot.data().count;
		let final_subId = "";
		if (totalUsers >= 0) {
			// get last 4 characters of the docRef.id
			const docRef = await addDoc(userCollection, user);
			const id = docRef.id.slice(-3);
			final_subId = (totalUsers + 1).toString() + id;

			// update the user with the final_subId
			const userRef = doc(userCollection, docRef.id);
			await updateDoc(userRef, { subId: final_subId });
		}

		// get the current link
		const link = window.location.href;

		// return the link with the final_subId
		return `${link}${final_subId}`;
	} catch (error) {
		console.error("Error adding document: ", error);
		return null;
	}
};

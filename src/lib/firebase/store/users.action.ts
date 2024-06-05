import { collection, addDoc, getFirestore } from "firebase/firestore";
import firebaseDb from "../config/firebase";
import { Users } from "./users.type";

export const addUser = async (user: Users) => {
	const db = getFirestore(firebaseDb);
	if (user) {
		const docRef = await addDoc(collection(db, "users"), user);
		console.log("Document written with ID: ", docRef.id);
	}
};

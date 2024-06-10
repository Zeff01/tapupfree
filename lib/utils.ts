import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createUserLink = (userCode: string) => {
	try {
		if (!userCode) return "";
		// link pattern {link}/users/{userCode}
		const user_link = `${process.env.NEXT_PUBLIC_BASE_LINK}/users/${userCode}`;
		return user_link;
	} catch (error) {
		console.error("Error creating link: ", error);
		throw new Error("Error creating link");
	}
};

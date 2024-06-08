import React from "react";
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";
import { Users } from "@/src/lib/firebase/store/users.type";

export default async function UsersPage() {
	const users = await getAllUsers();
	let finalUsers: Users[] = [];

	if (users.length > 0) {
		// replace all user links with the base link
		finalUsers = users.map((user) => {
			return {
				...user,
				user_link: user?.user_link?.replace(
					"{BASE_LINK}",
					process.env.NEXT_PUBLIC_BASE_LINK as string
				),
			};
		});
	}

	const allUsers = JSON.parse(JSON.stringify(finalUsers));

	if (allUsers.length === 0) return <div>Empty</div>;

	return (
		<main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
			<TableComponent users={allUsers} />
		</main>
	);
}

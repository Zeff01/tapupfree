import React from "react";
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";
import Navbar from "@/components/ui/Navbar";

export default async function UsersPage() {
  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  if (allUsers.length === 0) return <div>Empty</div>;

  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <Navbar />
      <TableComponent users={allUsers} />
    </main>
  );
}

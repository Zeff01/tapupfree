import React from "react";
<<<<<<< HEAD
import { getAllUsers } from "@/src/lib/firebase/store/users.action";
import TableComponent from "./components/TableComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function UsersPage() {
  const users = await getAllUsers();
  const allUsers = JSON.parse(JSON.stringify(users));

  if (allUsers.length === 0) return <div>Empty</div>;

  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <TableComponent users={allUsers} />
      <ToastContainer />
    </main>
  );
}
=======

const page = () => {
  return <div>page</div>;
};

export default page;
>>>>>>> 20b7568dd467cf5b7a17d377b49fdd83a670212a

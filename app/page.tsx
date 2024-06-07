"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToCreate = () => {
    router.push("/create");
  };
  const navigateToTable = () => {
    router.push("/users");
  };

  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <Image
        src="/assets/zwift-logo.png"
        alt="Company Logo"
        width={150}
        height={150}
        priority
        className="mx-auto mb-8"
      />
      <button
        onClick={navigateToCreate}
        className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8"
      >
        Create Digital Business Card
      </button>
      <button
        onClick={navigateToTable}
        className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8"
      >
        Go to Users Table
      </button>
    </main>
  );
}

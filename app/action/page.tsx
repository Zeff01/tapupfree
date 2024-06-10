"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";

const ActionPage = () => {
  const [link, setLink] = useState<string | undefined>();
  const [user, setUser] = useState<string | undefined>();
  const router = useRouter();
  const userCode = useSearchParams().get("userCode");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LINK}/users/${user}`
      );
      if (!response) {
        throw new Error("No response from server");
      }
      const getRawLink = response.data.data.user_link;
      const link = getRawLink.replace(
        "{BASE_LINK}",
        process.env.NEXT_PUBLIC_BASE_LINK
      );
      console.log("link", link);
      window.location.href = link;
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    const storedLink = localStorage.getItem("userLink");
    const storedUser = localStorage.getItem("userCode");
    if (storedLink) setLink(storedLink);
    if (storedUser) setUser(storedUser);
  }, []);

  const handlePrintQR = () => {
    router.push(`/card/${userCode}`);
  };

  if (!link) {
    return (
      <div className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
        <MoonLoader
          loading={true}
          color="gray"
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
      <div className="p-6  rounded-lg">
        <Image
          src="/assets/zwift-logo.png"
          alt="Company Logo"
          width={150}
          height={150}
          priority
          className="mx-auto mb-12"
        />
        <button
          onClick={fetchUserData}
          className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8"
        >
          Go to Digital business card
        </button>
        <button
          onClick={handlePrintQR}
          className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8"
        >
          Print Layout
        </button>
      </div>
    </main>
  );
};

export default ActionPage;

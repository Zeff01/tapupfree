"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";

export default function Home() {
  const router = useRouter();

  const navigateToCreate = () => {
    router.push("/create");
  };
  const navigateToTable = () => {
    router.push("/users");
  };

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };
  console.log("firebaseConfig:", firebaseConfig);

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
      {/* <QRCode
        value="https://bradwell-fe.vercel.app"
        size={256} // Size of the QR code
        level="H" // Error correction level: L, M, Q, H
        includeMargin={true} // Include a margin around the QR code
      /> */}
    </main>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-custom-black text-white fixed top-0 left-0 flex flex-row gap-x-4 z-10 w-full py-1 px-6 ">
      <button
        onClick={() => router.back()}
        className="font-semibold text-lg hover:text-[#6150EB]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 7.5H14.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      </button>
      <Link href="/" className="font-semibold text-lg hover:text-[#6150EB]">
        Home
      </Link>
    </nav>
  );
}

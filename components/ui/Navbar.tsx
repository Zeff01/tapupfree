"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import Image from "next/image";
import { Rotate3DIcon, RotateCcw, RotateCwIcon } from "lucide-react";
import revalidateUserPath from "@/src/lib/firebase/store/user.revalidate";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  return (
    <nav className="bg-custom-black text-white items-center fixed top-0 left-0 flex flex-row gap-x-4 z-10 w-full py-1 px-6 ">
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
      {pathname === "/users" && (
        <Button
          onClick={() => {
            revalidateUserPath("/users");
          }}
          variant="link"
          size="icon"
        >
          <RotateCcw width={20} height={20} className="text-white" />
        </Button>
      )}
    </nav>
  );
}

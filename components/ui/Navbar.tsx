"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router = useRouter()    

    return (
        <nav className="bg-custom-black text-white fixed top-0 left-0 flex flex-row gap-x-4 z-10 w-full py-1 px-6 shadow-md">
            <Link href="/" className="font-semibold text-lg hover:text-[#6150EB]">Home</Link>
            <button onClick={() => router.back()} className="font-semibold text-lg hover:text-[#6150EB]">Back</button>
      </nav>
    )
}
"use client"
import Image from "next/image";
import GridLoader from "react-spinners/GridLoader"

export default function LoadingLogo() {
    return (
        <div className="bg-custom-black w-screen h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-y-6 -translate-y-1/2">
                <GridLoader size={20} color="#6150EB" />
                <Image
                src="/assets/zwift-logo.png"
                alt="Company Logo"
                width={150}
                height={150}
                priority
                className="mx-auto mb-8"
                />
            </div>
        </div>
    )
}
"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserLink } from "@/lib/utils";
import Navbar from "@/components/ui/Navbar";


const ActionPage = () => {
	const router = useRouter();
	const code = useSearchParams().get("userCode") as string;

	const fetchUserData = async () => {
		const link = createUserLink(code)
		window.location.href = link
	};


	const handlePrintQR = () => {
		router.push(`/card/${code}`);
	};


	return (
		<main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
			<Navbar />
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

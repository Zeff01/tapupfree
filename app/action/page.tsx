"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const ActionPage = () => {
	const [link, setLink] = useState<string | undefined>();
	const [user, setUser] = useState<string | undefined>();
	const router = useRouter();
	const userCode = useSearchParams().get("userCode");

	useEffect(() => {
		// Directly retrieve the link and user code from localStorage
		const storedLink = localStorage.getItem("userLink");
		const storedUser = localStorage.getItem("userCode");
		if (storedLink) setLink(storedLink);
		if (storedUser) setUser(storedUser);
	}, []);

	const fetchUserData = async () => {
		try {
			console.log("Fetching user data...");
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_LINK}/users/${user}`
			);
			console.log("response:", response);
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

	const handlePrintQR = () => {
		router.push(`/card/${userCode}`);
		// const qrCodeElement = document.getElementById("qrCodeElement");
		// if (qrCodeElement) {
		//   const printWindow = window.open("", "_blank");
		//   printWindow?.document.open();
		//   printWindow?.document.write(
		//     `<html><body>${qrCodeElement.innerHTML}</body></html>`
		//   );
		//   printWindow?.document.close();
		//   printWindow?.print();
		//   printWindow?.close();
		// }
	};

	if (!link) {
		return (
			<div className="text-center">
				Loading link... If this persists, please check the local storage.
			</div>
		);
	}

	return (
		<main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
			<div className="p-6 shadow-lg rounded-lg">
				<Image
					src="/assets/zwift-logo.png"
					alt="Company Logo"
					width={150}
					height={150}
					priority
					className="mx-auto mb-12"
				/>
				{/* <div id="qrCodeElement" className="p-4 border-b mb-4">
          <QRCode value={link} />
        </div> */}
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

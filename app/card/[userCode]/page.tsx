"use client";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { getUserDataByUserCode } from "@/src/lib/firebase/store/users.action";
import { Users } from "@/src/lib/firebase/store/users.type";
import { useParams } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";
import Navbar from "@/components/ui/Navbar";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

export default function Card() {
	const cardRef = useRef<HTMLDivElement>(null);
	const [user, setUser] = useState<Users | null>(null);
	const { userCode } = useParams() as { userCode: string };

	const userDataHandler = async () => {
		const data = await getUserDataByUserCode(userCode);
		if (!data) return;
		setUser(data);
	};

	useEffect(() => {
		console.log("card effect");
		if (!userCode) return;
		userDataHandler();
	}, [userCode, userDataHandler]);

	const handleDownloadImage = async () => {
		const card = cardRef.current;
		if (!card || !user) return;
		await html2canvas(card, { scale: 1.1 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");

			// Create a link element
			const link = document.createElement("a");

			// Set the download attribute with a filename
			const fileName = `${user?.lastName}.png`;
			link.download = fileName;

			// Set the href attribute to the image data URL
			link.href = imgData;

			// Append the link to the body (required for Firefox)
			document.body.appendChild(link);

			// Trigger a click event on the link to start the download
			link.click();

			// Remove the link from the document
			document.body.removeChild(link);
		});
	};

	return (
		<div className="bg-custom-black w-full h-screen flex flex-col items-center px-2 py-16 gap-y-4 overflow-y-hidden">
			<Navbar />
			<div
				ref={cardRef}
				className={`text-black dark:text-black relative w-[400px] aspect-[1.5882] p-2 shadow-md rounded-md`}
				style={{ backgroundColor: "white" }}
			>
				{user ? (
					<div className="w-full h-full flex flex-row gap-x-2 justify-between">
						<div className="flex-grow flex flex-col justify-between">
							<div>
								<span
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										fontSize: "12px",
										height: "20px",
									}}
								>
									&#128231; &nbsp;&nbsp;{user.email}
								</span>

								<span
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										fontSize: "12px",
										height: "20px",
									}}
								>
									&#128222; &nbsp;&nbsp;{user.phoneNumber}
								</span>
							</div>

							{/* <div>
                <div className="flex flex-row items-center gap-x-2 text-[12px] h-5">
                  <p>🖂&nbsp;&nbsp;{user.email}</p>
                </div>
                <div className="flex flex-row items-center gap-x-2 text-[12px] h-5">
                  <p>☏&nbsp;&nbsp;{user.phoneNumber}</p>
                </div>
              </div> */}

							<div className="flex flex-col gap-y-[2px]">
								{user.image && (
									<Image
										src={user.image}
										width={70}
										height={70}
										alt="user photo"
										style={{ objectFit: "cover" }}
										priority
										className="w-[70px] h-[70px] shadow-sm rounded-full"
									/>
								)}
								<div>
									<p className="font-semibold text-sm text-black">
										{user.firstName}&nbsp;{user.lastName}
									</p>
									<p className="text-[12px] text-black">{user.position}</p>
								</div>
								<p className="text-[12px] text-black">{user.company}</p>
							</div>
						</div>
						<div>
							<QRCodeSVG value={user.user_link as string} size={100} />
						</div>
					</div>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<MoonLoader
							loading={true}
							color="gray"
							size={40}
							aria-label="Loading Spinner"
							data-testid="loader"
							speedMultiplier={0.5}
						/>
					</div>
				)}
			</div>
			<button
				onClick={handleDownloadImage}
				className="bg-custom-purple text-white px-6 py-2 font-semibold rounded-md active:scale-95 transition-all duration-150 disabled:opacity-50"
				disabled={Boolean(!user)}
			>
				Convert to PNG
			</button>
		</div>
	);
}

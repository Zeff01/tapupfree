"use client";
import {
	addUser,
	getAllUsers,
	getUserBySubId,
	updateUserPrintStatusById,
	uploadImage,
} from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";

export default function Home() {
	const [photo, setPhoto] = useState<Photo | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("Form submitted");

		// integrate the addUser function here

		const user = {
			company: event.currentTarget.company.value,
			position: event.currentTarget.position.value,
			firstName: event.currentTarget.firstName.value,
			lastName: event.currentTarget.lastName.value,
			email: event.currentTarget.email.value,
			phoneNumber: event.currentTarget.phone.value,
			image: imageUrl || "",
			printStatus: false,
		};
		// const link = await addUser(user);
		const userList = await getAllUsers();
		// console.log(link);
		console.log(userList);
		const userbyId = await getUserBySubId("5uHHKTqREUT3TY8DMShE");
		console.log(userbyId);
		await updateUserPrintStatusById("5uHHKTqREUT3TY8DMShE");
	};

	const handlePhotoChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setPhoto({
				preview: URL.createObjectURL(file),
				raw: file,
			});

			const dl_url = await uploadImage({
				preview: URL.createObjectURL(file),
				raw: file,
			});
			if (dl_url) setImageUrl(dl_url);
		}
	};

	return (
		<main className="flex min-h-screen bg-[#1E1E1E] text-white flex-col items-center pt-12 p-6 ">
			<div className="w-full max-w-sm">
				<div className="text-center mb-6 ">
					<Image
						src="/assets/zwift-logo.png"
						alt="Company Logo"
						width={150}
						height={150}
						priority
						className="mx-auto mb-8"
					/>
					<h2 className="text-lg font-semibold mt-2">Company Profile</h2>
				</div>
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div className="flex flex-col items-center">
						<div className="relative">
							<div className="rounded-full border border-border-input  p-1">
								{photo ? (
									<img
										src={photo.preview}
										alt="Profile"
										className="w-28 h-28 rounded-full"
									/>
								) : (
									<div className="w-28 h-28 rounded-full bg-background-input border-border-input flex items-center justify-center">
										<Image
											src="/assets/imageicon.png"
											alt="Company Logo"
											width={30}
											height={30}
											priority
											className="mx-auto"
										/>
										<div className="flex justify-center items-center w-8 h-8 border rounded-full absolute bottom-0 right-0 bg-background-input border-border-input">
											<Image
												src="/assets/plusicon.png"
												alt="Add Icon"
												width={14}
												height={14}
												priority
											/>
										</div>
									</div>
								)}
							</div>
							<input
								type="file"
								accept="image/*"
								onChange={handlePhotoChange}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
						</div>
					</div>

					{[
						{
							name: "position",
							placeholder: "Your position",
							label: "Position:",
						},
						{
							name: "company",
							placeholder: "Name of Company",
							label: "Company:",
						},
						{
							name: "firstName",
							placeholder: "Enter your first name",
							label: "First Name:",
						},
						{
							name: "lastName",
							placeholder: "Enter your last name",
							label: "Last Name:",
						},
						{
							name: "email",
							placeholder: "Your active email",
							label: "Email:",
							type: "email",
						},
						{
							name: "phone",
							placeholder: "+63",
							label: "Phone Number:",
							type: "tel",
							pattern: "[0-9]{10}",
						},
					].map((field) => (
						<div key={field.name}>
							<label className="block">
								{field.label}
								<input
									type={field.type || "text"}
									name={field.name}
									required
									className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-background-input border border-border-input rounded-md"
									placeholder={field.placeholder}
									pattern={field.pattern}
								/>
							</label>
						</div>
					))}

					<button
						type="submit"
						className="w-full px-4 py-2 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold"
					>
						Submit
					</button>
				</form>
			</div>
		</main>
	);
}

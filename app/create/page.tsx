"use client"
import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addUser, uploadImage } from "@/src/lib/firebase/store/users.action";
import { Photo } from "@/src/lib/firebase/store/users.type";
import Cropper from "../users/components/Cropper";

export default function Create() {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({}); // Properly typed as Record<string, string>
  const router = useRouter();

  const validateForm = (elements: HTMLFormControlsCollection) => {
    const newErrors: Record<string, string> = {};
    const emailElement = elements.namedItem("email") as HTMLInputElement;
    if (emailElement && !emailElement.value.includes("@")) {
      newErrors.email = 'Email must include an "@" symbol.';
    }
    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const errors = validateForm(form.elements);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const userInfo = await addUser({
      company: form.company.value,
      position: form.position.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phoneNumber: form.phone.value,
      image: imageUrl || "",
      printStatus: false,
    });
    console.log(typeof userInfo, userInfo);

    if (userInfo) {
      localStorage.setItem("userLink", userInfo.user_link);
      localStorage.setItem("userCode", userInfo.userCode);
      router.push(`/action?userCode=${userInfo.userCode}`);
    } else {
      console.error("userLink is undefined or not valid.");
    }
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
          <Cropper
            setFileName={() => {}}
            aspect={1 / 1}
            changeImage={(p) => console.log(p)}
            circularCrop={true}
            />
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
          {Object.keys(formErrors).length > 0 && (
            <div className="error-messages">
              {Object.entries(formErrors).map(([key, value]) => (
                <div key={key} className="text-red-500">
                  {value as string}
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="rounded-full border border-border-input  p-1">
                {photo ? (
                  <Image
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
              pattern: "+639[0-9]{9}",
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
            className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

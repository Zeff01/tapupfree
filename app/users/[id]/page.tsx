"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Users } from "@/src/lib/firebase/store/users.type";
import FieldwithLogo from "@/components/FieldwithLogo";
import { CircleUser } from "lucide-react";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [userData, setUserData] = useState<Users | null>(null);
  const [user, setUser] = useState<string | undefined>();

  useEffect(() => {
    const storedUser = localStorage.getItem("userCode");
    if (storedUser) {
      setUser(storedUser);
      return;
    }
    setUser(id);
  }, [id]);

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_LINK}/users/${user}`
      );
      if (!response) {
        throw new Error("No response from server");
      }
      console.log("User data: ", response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  const downloadVCard = () => {
    if (!userData) return;

    // Manually create vCard data
    let vCardString = "BEGIN:VCARD\n";
    vCardString += "VERSION:3.0\n";
    vCardString += `FN:${userData.firstName} ${userData.lastName}\n`;
    vCardString += `N:${userData.lastName};${userData.firstName};;;\n`;
    vCardString += `ORG:${userData.company}\n`;
    vCardString += `TITLE:${userData.position}\n`;
    vCardString += `TEL;TYPE=CELL:${userData.phoneNumber}\n`;
    vCardString += `EMAIL:${userData.email}\n`;
    if (userData.image) {
      vCardString += `PHOTO;TYPE=JPEG;ENCODING=b:${userData.image}\n`;
    }
    vCardString += "END:VCARD";

    // Create a Blob from the vCard String
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            className="mx-auto mb-12"
          />
          <h2 className="text-lg font-semibold mt-2">Personal Portfolio</h2>
        </div>
        {userData ? (
          <div className="text-center mb-6">
            {userData.image ? (
              <Image
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto"
              />
            ) : (
              <Image
                src="/assets/image-placeholder.svg"
                alt="No profile"
                width={128}
                height={128}
                priority
                className="mx-auto"
              />
            )}

            <h1 className="text-xl font-semibold mt-4">
              {userData.firstName} {userData.lastName}
            </h1>
            <h1 className="text-lg font-semibold text-[#767676]">
              {userData.email}
            </h1>

            <div className="flex flex-col  mx-auto my-8 ">
              <div className="mx-auto flex flex-col gap-8">
                <FieldwithLogo
                  imgUrl={"/assets/phoneLogo.png"}
                  value={userData.phoneNumber}
                />
                <FieldwithLogo
                  imgUrl={"/assets/companyLogo.png"}
                  value={userData.company}
                />
                <FieldwithLogo
                  imgUrl={"/assets/positionLogo.png"}
                  value={userData.position}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8"
                onClick={downloadVCard}
              >
                Save Contact
              </button>
            </div>
          </div>
        ) : (
          <div className="w-[384px] h-[596px]">
            <div className="text-center mb-6">
              <CircleUser size={120} className="mx-auto text-[#767676]" />
              <h1 className="text-xl font-semibold mt-4 w-[100px] bg-[#767676] rounded-xl mx-auto my-2">
                &nbsp;
              </h1>
              <h1 className="text-lg font-semibold w-[200px] bg-[#767676] rounded-xl mx-auto">
                &nbsp;
              </h1>

              <div className="flex flex-col  mx-auto my-8 ">
                <div className="mx-auto flex flex-col gap-8">
                  <FieldwithLogo
                    imgUrl={"/assets/phoneLogo.png"}
                    value={"+639*********"}
                  />
                  <FieldwithLogo
                    imgUrl={"/assets/companyLogo.png"}
                    value={".........."}
                  />
                  <FieldwithLogo
                    imgUrl={"/assets/positionLogo.png"}
                    value={".........."}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  className="w-full px-4 py-4 bg-[#6150EB] hover:bg-[#6250ebc0] rounded-md font-bold mt-8 disabled:opacity-50"
                  disabled
                >
                  Save Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default UserPage;

"use client"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"
import { CiMail } from "react-icons/ci";
import { SlPhone } from "react-icons/sl";
import { useRef } from "react";
import { exportComponentAsPNG } from "react-component-export-image"
import html2canvas from "html2canvas"

export default function Print() {
    const cardRef = useRef<HTMLDivElement>(null)

    const dummyData = {
        position: "Software Developer",
        company: "Codibility",
        firstName: "Jade Barry",
        lastName: "Lazo",
        email: "oneabove232@gmail.com",
        phoneNumber: "09121212121",
        image: "https://firebasestorage.googleapis.com/v0/b/zwifttech-ccabf.appspot.com/o/users%2F86ad0271-63c2-4a3c-a52b-b9c3a3fab646.jpg?alt=media&token=be034d43-010d-48f7-8ab9-c0e5d594e96d",
        user_link: "https://web.facebook.com/nephrite.again/"
    }

    const fullName = `${dummyData.firstName} ${dummyData.lastName}`

    const handleDownloadImage = () => {
        const card = cardRef.current;
        if (!card) return
        html2canvas(card, { scale: 2 }).then(async canvas => {
          const imgData = await canvas.toDataURL('image/png');
      
          // Create a link element
          const link = document.createElement('a');
      
          // Set the download attribute with a filename
          const fileName = `${fullName}.png`
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
        <div className="w-full h-screen flex flex-col items-center px-2 py-12 gap-y-4">
            <div id="card" ref={cardRef} className={`relative w-[400px] aspect-[1.5882] p-6 shadow-md rounded-md`} style={{backgroundColor: "white"}}>
                <div className="w-full h-full flex flex-row gap-x-2 justify-between">
                    <div className="flex-grow flex flex-col justify-between">
                        <div>
                            <div className="flex flex-row items-center gap-x-2 text-sm">
                                <CiMail />
                                <p>{dummyData.email}</p>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 text-sm">
                                <SlPhone />
                                <p>{dummyData.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-[2px]">
                            <Image 
                            src={dummyData.image} 
                            width={60}
                            height={60} 
                            alt="user photo" 
                            style={{objectFit: "cover"}}
                            className="w-[60px] h-[60px] shadow-sm rounded-sm"
                            />
                            <div>
                                <p className="font-semibold">{fullName}</p>
                                <p className="text-sm">{dummyData.position}</p>
                            </div>
                            <p className="text-sm">{dummyData.company.toUpperCase()}</p>
                        </div>
                    </div>
                    <div>
                        <QRCodeSVG value={dummyData.user_link} size={100} fgColor="gray" />
                    </div>
                </div>
            </div>
            <button 
            onClick={handleDownloadImage} 
            className="bg-green-300 px-6 py-2 font-semibold rounded-md shadow-md active:scale-95 transition-all duration-150">
                Convert to PNG
            </button>
        </div>
    )
}
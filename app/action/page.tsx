"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

const ActionPage = () => {
  const [link, setLink] = useState<string | undefined>();

  useEffect(() => {
    // Directly retrieve the link from localStorage
    const storedLink = localStorage.getItem("userLink");
    if (storedLink) {
      setLink(storedLink);
    }
  }, []);

  if (!link) {
    return (
      <div className="text-center">
        Loading link... If this persists, please check the local storage.
      </div>
    );
  }

  const handleRedirect = () => {
    if (link) {
      window.location.href = link;
    }
  };

  const handlePrintQR = () => {
    const qrCodeElement = document.getElementById("qrCodeElement");
    if (qrCodeElement) {
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        `<html><body>${qrCodeElement.innerHTML}</body></html>`
      );
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <div id="qrCodeElement" className="p-4 border-b mb-4">
          <QRCode value={link} />
        </div>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Go to Digital business card
        </button>
        <button
          onClick={handlePrintQR}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Print QR
        </button>
      </div>
    </div>
  );
};

export default ActionPage;

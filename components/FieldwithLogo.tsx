import Image from "next/image";
import React from "react";

interface FieldwithLogo {
  value: string;
  imgUrl: string;
}

const FieldwithLogo = ({ value, imgUrl }: FieldwithLogo) => {
  return (
    <div className="flex items-center  gap-6 ">
      <Image src={imgUrl} alt="Phone logo" width={60} height={60} priority />
      <div className="text-left">{value}</div>
    </div>
  );
};

export default FieldwithLogo;

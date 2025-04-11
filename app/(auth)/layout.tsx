import Image from "next/image";
import React from "react";
import { CldImage } from 'next-cloudinary';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 h-full flex items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex w-1/2 h-full relative">
        <Image
          src={"/logo_hopecare.jpg"}
          width={1000}
          height={1000}
          alt="Doctor"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 flex flex-col items-center justify-center">
          <h1 className="text-3xl 2xl:text-5xl font-bold text-white">
            HOPECARE
          </h1>
          <p className="text-customTeal text-base 2xl:text-lg">Te damos la bienvenida</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

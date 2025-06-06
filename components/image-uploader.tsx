"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface UploaderProps {
  imgURL: string;
  setImgURL: React.Dispatch<React.SetStateAction<string | any>>;
  img?: string;
}
export const ImageUploader = ({ imgURL, setImgURL }: UploaderProps) => {
  return (
    <CldUploadWidget
      uploadPreset="HopeCare"
      onSuccess={(res, { widget }) => {
        setImgURL(res.info);
        widget.close();
      }}
    >
      {({ open }) => {
        return (
          <div className="flex gap-4 z-[999]">
            <Image
              src={imgURL ? imgURL : "/profile.png"}
              width={60}
              height={60}
              alt="profile picture"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => open()}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="pl-0 text-blue-600 text-base font-normal"
                >
                  Subir foto
                </Button>
              </div>
              <p className="text-sm text-gray-500">
              Sube una Foto de perfil, lo mejor es que tenga la misma longitud y altura.
              </p>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

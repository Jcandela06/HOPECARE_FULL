import React from "react";
import { FaMagnifyingGlassChart } from "react-icons/fa6";

export const NoDataFound = ({ note }: { note?: string }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-0">
      <FaMagnifyingGlassChart size={80} className="text-gray-600" />
      <span className="text-base md:text-xl text-center text-gray-500 mt-2 font-medium">
        {note || "No se encontró ningún registro"}
      </span>
    </div>
  );
};

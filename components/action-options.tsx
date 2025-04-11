"use client";

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ActionOptions = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center rounded-full p-1"
        >
          <EllipsisVertical size={16} className="text-sm text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3">
        <span className="text-xs text-gray-400 mb-4 uppercase">
        Realizar acción
        </span>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export const ViewAction = ({
  href,
  disabled = false,
  label,
}: {
  href: string;
  disabled?: boolean;
  label?: string;
}) => {
  return (
    <Link href={href}>
      <button disabled={disabled} className={"view-btn"}>
        {label || "View"}
      </button>
    </Link>
  );
};

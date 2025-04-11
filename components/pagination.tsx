"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Button } from "./ui/button";

interface PaginationProps {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
export const Pagination = ({
  totalPages,
  currentPage,
  totalRecords,
  limit,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(
        pathname + "?" + createQueryString("p", (currentPage - 1).toString())
      );
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(
        pathname + "?" + createQueryString("p", (currentPage + 1).toString())
      );
    }
  };

  if (totalRecords === 0) return null;

  return (
    <div className="px-0 py-4 md:p-4 flex items-center justify-between text-foreground mt-5">
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === 1}
        onClick={handlePrevious}
        className="py-2 px-2 md:px-4 rounded-md bg-slate-200 dark:bg-transparent  text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-xs lg:text-sm">
        Demostración {currentPage * limit - (limit - 1)} a{" "}
          {currentPage * limit <= totalRecords
            ? currentPage * limit
            : totalRecords}{" "}
          de {totalRecords}
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="py-2 px-2 md:px-4 rounded-md bg-slate-200 dark:bg-transparent text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente
      </Button>
    </div>
  );
};

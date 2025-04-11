"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Banner1 = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar renderizar hasta que el tema esté montado
  if (!mounted) return null;

  const imageSrc = (resolvedTheme || theme) !== "light"
    ? "/list-dark.png"
    : "/list.png";

  return (
    <div className="flex items-center justify-center md:pb-20 px-4">
      <Image
        src={imageSrc}
        width={1000}
        height={850}
        alt="Banner1"
        quality={100}
        priority
        className="rounded-3xl hover:scale-105 lg:hover:scale-110 duration-700 ease-in-out border-8 border-border shadow-2xl"
      />
    </div>
  );
};

export const Banner = () => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const imageSrc = (resolvedTheme || theme) !== "light"
    ? "/dashboard-dark.png"
    : "/dashboard.png";

  return (
    <div className="flex items-center justify-center -mt-20 px-4">
      <Image
        src={imageSrc}
        width={1000}
        height={850}
        alt="Banner"
        quality={100}
        priority
        className="rounded-3xl hover:scale-105 lg:hover:scale-110 duration-700 ease-in-out border-8 border-border shadow-xl"
      />
    </div>
  );
};


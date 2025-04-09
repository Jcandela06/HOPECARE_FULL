import Link from "next/link";

import { LogoLink } from "./sidebar";
import { ThemeToggle } from "./theme-switcher";

export const PublicNavbar = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="max-w-6xl w-full px-6 py-6 flex items-center justify-between">
        <LogoLink />

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link href={"/about"}>Nosotros</Link>
          <Link href={"/features"}>Características</Link>
          <Link href={"/contact"}>Contactanos</Link>
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

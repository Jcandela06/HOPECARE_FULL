import { Footer } from "@/components/footer";
import { PublicNavbar } from "@/components/public-navbar";
import { ReactNode } from "react";

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="">
      <PublicNavbar />
      {children}

      <Footer />
    </main>
  );
};

export default PublicLayout;

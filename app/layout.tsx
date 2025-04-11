import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/hooks/theme-provider";
import { dir } from "i18next";
import { languages, defaultLang } from "@/i18n/settings";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Healthcare Management System",
  description:
    "A robust system for patient management systems that provides patient information about patient organizations and services.",
};

// Generar parámetros para rutas estáticas con idiomas
export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }));
}

const RootLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) => {
  return (
    <ClerkProvider>
      <html lang={params.lang || defaultLang} dir={dir(params.lang || defaultLang)} suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;

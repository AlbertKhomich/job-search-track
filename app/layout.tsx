import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeModeScript } from "flowbite-react";
import { NavbarMain } from "./ui/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Report",
  description: "List of all my CV, that i sent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${inter.className} bg-gray-300 dark:bg-gray-600 dark:text-gray-100`}
      >
        <div className="grid place-items-center mx-4">
          <div className="mt-16 mb-32 w-full xl:w-3/5">
            <NavbarMain />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

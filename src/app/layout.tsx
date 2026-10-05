import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jejak Data Budaya",
  description: "Petualangan edukasi interaktif belajar data di Pasar Budaya Batak Toba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fredoka.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

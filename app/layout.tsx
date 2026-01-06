import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import  { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pickleball",
  description: "The Pickleball Revolution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="">
          <Navbar></Navbar>
          <div className="min-h-screen ">{children}</div>
          <Toaster position="top-right" />
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <div className={isAdmin ? "" : "min-h-screen"}>{children}</div>
      {!isAdmin && <Footer />}
    </>
  );
}

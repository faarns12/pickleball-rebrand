"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Utensils } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "#menu" },
    { name: "Store", href: "#store" },
    { name: "Blog", href: "#blog" },
  ];

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white/20 backdrop-blur-sm sticky top-0 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-30"}
      `}
    >
      <div className="w-11/12 mx-auto px-4 md:px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Pickleball Bangladesh"
              width={56}
              height={56}
              className="w-14 h-14"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="bg-[#F7F7F7] md:px-4 lg:px-5 py-2.5 md:py-3.5 rounded-[14px]
                  font-geist text-[#141414] font-medium
                  hover:bg-gray-200 transition-colors text-sm md:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
          <Link href={"#menu"}>  <button className="bg-[#0A2C23] hover:bg-[#051612] text-base font-geist text-[#FFFFFF] px-4 md:px-5 py-2.5 md:py-3.5 rounded-[14px] flex items-center gap-2 transition-colors font-medium">
              <Utensils size={18} />
              Explore Menu
            </button></Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden transition-transform duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
  className={`
    absolute w-full md:hidden px-6 left-0 bg-white/95 backdrop-blur-sm z-50 overflow-hidden
    transition-all duration-300 ease-in-out
    ${isMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
    md:static md:max-h-full md:opacity-100 md:translate-y-0 md:flex md:items-center md:space-x-6 md:bg-transparent md:backdrop-blur-0
  `}
>
  <div className="mt-3 md:mt-0 pb-4 space-y-3 md:space-y-0 md:flex md:items-center md:pb-0 border-t md:border-0 pt-3 md:pt-0">
    {navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        onClick={() => setIsMenuOpen(false)}
        className="block py-2 px-4 md:px-0 hover:text-gray-900 font-geist text-[#141414] font-medium hover:bg-gray-200 transition-colors text-sm md:text-base md:hover:bg-transparent"
      >
        {link.name}
      </Link>
    ))}

    <Link href={"#menu"}>  <button className="w-full md:w-auto bg-[#0A2C23] hover:bg-[#051612] text-base font-geist text-[#FFFFFF] px-4 md:px-5 py-2.5 md:py-3.5 rounded-[14px] flex items-center gap-2 transition-colors font-medium">
      <Utensils size={18} />
      Explore Menu
    </button></Link>
  </div>
</div>

      </div>
    </nav>
  );
};

export default Navbar;

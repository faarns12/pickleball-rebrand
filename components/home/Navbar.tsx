"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Utensils } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "#menu" },
    { name: "Store", href: "#store" },
    { name: "Blog", href: "#blog" },
  ];

  return (
    <nav className=" bg-white/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-11/12 mx-auto px-6 py-2">
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
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative font-geist text-[#141414] font-medium transition-colors
                  after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
                  after:bg-gray-900 after:transition-all hover:text-gray-900 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium">
              <Utensils size={18} />
              Explore Menu
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 transition-transform duration-300"
            aria-label="Toggle menu"
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${
              isMenuOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }
          `}
        >
          <div className="mt-4 pb-4 space-y-4 border-t pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium">
              <Utensils size={18} />
              Explore Menu
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Utensils } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const navLinks = [
    { name: "About", sectionId: "about" },
    { name: "Services", sectionId: "services" },
    { name: "Menu", sectionId: "menu" },
    { name: "Store", sectionId: "store" },
    { name: "Blog", sectionId: "blog" },
  ];

  /* ── hide/show on scroll ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  /* ── smart click handler ──
     Home page  → smooth scroll to #sectionId
     Other page → Blog goes to /blog, rest go to /#sectionId
  ── */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (sectionId === "blog") {
      router.push("/blog");
    } else if (sectionId === "menu") {
      router.push("/menu");
    } else if (isHomePage) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  /* ── "Explore Menu" CTA handler ── */
  const handleMenuCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    router.push("/menu");
  };

  return (
    <nav
      className={`bg-white/20 backdrop-blur-sm sticky top-0 z-50
        transition-transform duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-30"}
      `}
    >
      <div className="w-11/12 mx-auto px-4 md:px-6 py-4">
        {/* ── Top Row ── */}
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={
                  link.sectionId === "blog"
                    ? "/blog"
                    : link.sectionId === "menu"
                      ? "/menu"
                      : isHomePage
                        ? `#${link.sectionId}`
                        : `/#${link.sectionId}`
                }
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="bg-[#F7F7F7] md:px-4 lg:px-5 py-2.5 md:py-3.5 rounded-[14px]
                  font-geist text-[#141414] font-medium
                  hover:bg-gray-200 transition-colors text-sm md:text-base cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href={isHomePage ? "#menu" : "/#menu"} onClick={handleMenuCTA}>
              <button className="bg-[#0A2C23] hover:bg-[#051612] text-base font-geist text-white px-4 md:px-5 py-2.5 md:py-3.5 rounded-[14px] flex items-center gap-2 transition-colors font-medium">
                <Utensils size={18} />
                Explore Menu
              </button>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden transition-transform duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`
            absolute w-full md:hidden px-6 left-0 bg-white/95 backdrop-blur-sm z-50 overflow-hidden
            transition-all duration-300 ease-in-out
            ${
              isMenuOpen
                ? "max-h-96 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2"
            }
          `}
        >
          <div className="mt-3 pb-4 space-y-1 border-t pt-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={
                  link.sectionId === "blog"
                    ? "/blog"
                    : link.sectionId === "menu"
                      ? "/menu"
                      : isHomePage
                        ? `#${link.sectionId}`
                        : `/#${link.sectionId}`
                }
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="block py-2.5 px-4 rounded-xl font-geist text-[#141414] font-medium
                  hover:bg-gray-100 transition-colors text-sm cursor-pointer"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2">
              <a href={isHomePage ? "#menu" : "/#menu"} onClick={handleMenuCTA}>
                <button className="w-full bg-[#0A2C23] hover:bg-[#051612] text-base font-geist text-white px-4 py-2.5 rounded-[14px] flex items-center gap-2 transition-colors font-medium">
                  <Utensils size={18} />
                  Explore Menu
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

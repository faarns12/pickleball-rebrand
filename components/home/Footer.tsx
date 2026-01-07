import React from "react";
import Image from "next/image";
import { PhoneCall } from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill,  } from "react-icons/ri";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] md:w-11/12   mx-auto px-6 md:px-8 lg:px-19.25 py-9.75 text-white rounded-tl-[50px] rounded-tr-[50px]">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row  justify-between gap-10 md:gap-14 pb-8  border-b border-[#767676]">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col items-center md:items-start  space-y-8 ">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Pickleball Bangladesh"
            width={64}
            height={64}
            className="w-16 h-16"
          />

          <div className="flex flex-col gap-4  items-center md:items-start ">
            {/* Heading */}
            <h2 className="text-3xl font-medium font-geist text-center md:text-left text-[#FFFFFF]">
              Ready to Experience the Pickleball?
            </h2>

            {/* Description */}
            <p className="text-[#999999] text-center md:text-left text-base font-geist leading-relaxed">
              Join us for fast-paced pickleball, great energy, and a welcoming
              community. <br className="hidden md:block" /> Whether you’re new or experienced, the court is ready
              for you.
             
            </p>
            <p className="text-base mb-1 font-geist">
              Sat – Fri: 10:00 AM – 12:00 AM
            </p>
            <p className="text-base mb-1 font-geist">
              Contact: 01805-004753 / 01518-923582
            </p>
            <p className="text-base font-medium mb-8 font-geist">
              Location: Rooftop, Haque Tower, Opposite Tower Inn Hotel, Jubilee
              Road, Chittagong
            </p>
            {/* Buttons */}
            <div className="flex gap-4">
              <Link href={"#Reserve"}>
                <button className="bg-[#F63F00]  hover:bg-orange-800 text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors ">
                  <PhoneCall className="w-4 lg:w-5" />
                  Reserve Your Spot
                </button>
              </Link>
              <Link href={"#menu"}>
                {" "}
                <button className="bg-[#707070] hover:bg-gray-600 text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-10 md:px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors ">
                  View Menu
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end justify-between">
          {/* Navigation Links */}
          <div className="flex gap-16 mb-12">
            <div className="space-y-5 text-center md:text-right">
              <a
                href="#faqs"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                FAQS
              </a>
              <a
                href="#store"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                STORE
              </a>
              <a
                href="#blog"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                BLOGS
              </a>
            </div>
            <div className="space-y-5 text-center md:text-right">
              <Link
                href="/"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                HOME
              </Link>
              <Link
                href="#menu"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                MENU
              </Link>
              <Link
                href="#services"
                className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors"
              >
                SERVICES
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-right space-y-4">
            <p className="text-[#FFFFFF] font-inter text-lg hidden md:block mb-4">
              Connect on
            </p>
            <div className="flex gap-4">
              <Link href="#twitter">
                <FaXTwitter size={30} className="text-[#828282]" />
              </Link>
              <Link href="#linkedin">
                <FaLinkedin size={30} className="text-[#828282]" />
              </Link>
              <Link href="https://www.instagram.com/pickleball.bangladesh?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D">
                <RiInstagramFill size={30} className="text-[#828282]" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61571549000702">
                <FaFacebook  size={30} className="text-[#828282]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
        <p className="text-base font-geist text-[#999999]">
          <Link href={"https://www.faarns.com/"} className="hover:text-white">
            © 2025 FAARNS.
          </Link>{" "}
          All right reserved
        </p>
        <div className="flex gap-8">
          <a
            href="#terms"
            className="text-base font-geist text-[#999999] hover:underline"
          >
            Terms & Conditions
          </a>
          <a
            href="#privacy"
            className="text-base font-geist text-[#999999] hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

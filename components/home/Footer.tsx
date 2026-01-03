import React from 'react';
import Image from 'next/image';
import {   PhoneCall } from 'lucide-react';
import { FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { RiInstagramFill, RiWhatsappLine } from 'react-icons/ri';
import Link from 'next/link';

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

            <div className='flex flex-col gap-4  items-center md:items-start '>
                {/* Heading */}
            <h2 className="text-3xl font-medium font-geist text-center md:text-left text-[#FFFFFF]">
             Ready to Experience the Pickleball?
            </h2>

            {/* Description */}
            <p className="text-[#999999] text-center md:text-left text-base font-geist leading-relaxed">
              If you`re looking for a branding who listens, understands,<br className="hidden md:block"/>
              and crafts with intention, let`s start the conversation
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-[#F63F00]  hover:bg-orange-800 text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors ">
                <PhoneCall   className='w-4 lg:w-5'/>
                Reserve Your Spot
              </button>
              <button className="bg-[#707070] hover:bg-gray-600 text-xs md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-10 md:px-4 py-3.5 rounded-[14px] flex items-center gap-1 transition-colors ">
                View Menu
              </button>
            </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-end justify-between">
            {/* Navigation Links */}
            <div className="flex gap-16 mb-12">
              <div className="space-y-5 text-center md:text-right">
                <a href="#faqs" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  FAQS
                </a>
                <a href="#store" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  STORE
                </a>
                <a href="#blogs" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  BLOGS
                </a>
              </div>
              <div className="space-y-5 text-center md:text-right">
                <a href="#home" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  HOME
                </a>
                <a href="#menu" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  MENU
                </a>
                <a href="#services" className="block text-[#FFFFFF] text-lg font-medium font-geist hover:text-gray-300 transition-colors">
                  SERVICES
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-right space-y-4">
              <p className="text-[#FFFFFF] font-inter text-lg hidden md:block mb-4">Connect on</p>
              <div className="flex gap-4">
              
               
                <Link href="#twitter">
                  <FaXTwitter size={30} className='text-[#828282]' />
                </Link>
                <Link href="#linkedin">
                  <FaLinkedin size={30} className='text-[#828282]' />
                </Link>
                <Link href="#instagram">
                  <RiInstagramFill size={30} className='text-[#828282]' />
                </Link>
                <Link href="#facebook">
                  <RiWhatsappLine size={30} className='text-[#828282]' />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p className='text-base font-geist text-[#999999]'><Link href={"https://www.faarns.com/"} className='hover:text-white'>© 2025 FAARNS.</Link> All right reserved</p>
          <div className="flex gap-8">
            <a href="#terms" className="text-base font-geist text-[#999999] hover:underline">
              Terms & Conditions
            </a>
            <a href="#privacy" className="text-base font-geist text-[#999999] hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
   
    </footer>
  );
};

export default Footer;
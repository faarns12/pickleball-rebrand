"use client";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const backgroundImages = [
    { id: 1, src: "/marque1.jpg" },
    { id: 2, src: "/marque3.jpg" },
    { id: 3, src: "/marque3.jpg" },
  ];

  return (
    <div className="relative bg-white overflow-hidden mt-5 md:mt-10">
      {/* Header Section */}
      <motion.div
        className="text-center max-w-5xl mx-auto mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-[28px] md:text-[60px] lg:text-[80px] font-geist font-bold md:font-semibold mb-2 md:leading-none px-2 md:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-[#707070] block">The Pickleball Revolution</span>
          <span className="text-black block">Starts Here in Chittagong!</span>
        </motion.h1>

        <motion.p
          className="text-[#707070] max-w-4xl px-4 font-geist xl md:text-2xl mb-3 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Bangladesh`s first pickleball-only sports brand and initiative. Play,
          connect, and compete at our court in Chittagong.
        </motion.p>

        {/* Reserve Button */}
        <motion.div
          className="flex justify-center mb-4 md:mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href={"#Reserve"}><button className="bg-[#0A2C23] hover:bg-[#040f0c] cursor-pointer hover:to-red-700 text-xs shadow-[20px_20px_28.28px_-2px_rgba(0,0,0,0.15),7.87px_7.87px_11.13px_-1.6px_rgba(0,0,0,0.12)] md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-3 py-2.5 rounded-[14px] flex items-center gap-2 transition-colors">
            <span className="px-3 py-2.5 bg-[#F63F00] rounded-[14px]">
              <PhoneCall className="w-5" />
            </span>
            Reserve Your Spot
          </button></Link>
        </motion.div>
      </motion.div>

      {/* Background Marquee */}
      <motion.div
        className="absolute mt-110 inset-0 flex overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {/* LEFT FADE */}
        <div className="hidden md:block pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-linear-to-r from-white to-transparent" />
        {/* RIGHT FADE */}
        <div className="hidden md:block pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-linear-to-l from-white to-transparent" />

        <div className="hidden md:block">
          <div className="flex animate-marquee whitespace-nowrap z-10">
            {[...backgroundImages, ...backgroundImages].map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                className="relative mx-6 rounded-2xl overflow-hidden shrink-0"
                style={{ width: "400px", height: "274px" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1 + index * 0.2 }}
              >
                <Image
                  src={item.src}
                  alt="Pickleball background"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Video */}
      <motion.div
        className="relative z-10 container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="max-w-204.75 max-h-123.5 mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-[28px_28px_28.28px_-2px_rgba(0,0,0,0.15),7.87px_7.87px_11.13px_-1.6px_rgba(0,0,0,0.12)] my-14 border-8 border-black">
            <div className="relative aspect-video bg-linear-to-br from-gray-800 to-gray-900">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls
                playsInline
                poster="front.jpg"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;

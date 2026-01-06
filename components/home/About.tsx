"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div id="about" className="flex flex-col items-center pt-10">
      {/* About Us Button */}
      <motion.div
        className="flex justify-center mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist">
          <Image src="/about.svg" alt="About" width={18} height={18} />
          <span className="font-medium">About Us</span>
        </div>
      </motion.div>

      {/* Paragraph / Heading */}
      <motion.p
        className="font-geist text-[22px] md:text-[40px] max-w-337.5 mx-auto lg:text-[45px] py-8 px-4 md:px-0"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        The Pickleball{" "}
        <motion.span
          className="inline-flex"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image
            src="/about1.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
            className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </motion.span>{" "}
        Revolution Starts here. This is a landmark moment: the first time ever a{" "}
        <motion.span
          className="inline-flex"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Image
            src="/about2.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
            className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </motion.span>{" "}
        Pickleball court and restaurant is opening{" "}
        <motion.span
          className="inline-flex"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Image
            src="/about3.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
            className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </motion.span>{" "}
        in Bangladesh. We are pioneering this exciting sport in the country,
        building the trend from the ground up and inviting you to be part of
        this historic first chapter.
      </motion.p>
    </div>
  );
}

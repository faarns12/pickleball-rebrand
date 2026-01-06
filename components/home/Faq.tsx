"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve clients across various regions, focusing primarily on local and national projects with customized service options depending on your location.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project durations vary, but most take between 4–12 weeks depending on design complexity, materials, and client approval timelines.",
  },
  {
    question: "Can you handle custom designs?",
    answer:
      "Yes, we specialize in unique and tailor-made designs that perfectly reflect your ideas, requirements, and overall vision.",
  },
  {
    question: "Do you provide project management and approvals?",
    answer:
      "Absolutely. We oversee the entire process — from concept to final approval — ensuring every step is handled professionally.",
  },
  {
    question: "What types of projects do you specialize in?",
    answer:
      "We focus on residential, commercial, and bespoke design projects that combine creativity with practical excellence.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section id="faqs" className="py-4 pt-10 sm:py-5 md:py-7 bg-white">
      <div className="flex flex-col lg:flex-row w-full gap-8">
        {/* Left side (heading/text) */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="gap-6 md:mb-10">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image src="/blog.svg" alt="Blog" width={18} height={18} />
              <span className="font-medium">FAQ</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0A244D] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#707070] font-geist">Your Questions</span>
              <br />
              <span className="text-[#0A0A0A] font-geist">Answered</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              className="text-[25px] font-geist text-[#707070]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Gear up with high-quality equipment <br className="hidden md:block" /> built for comfort and durability.
            </motion.p>
          </div>
        </motion.div>

        {/* Right side (FAQ list) */}
        <motion.div
          className="w-full lg:w-2/3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div className="space-y-4 w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="box-border bg-white border-2 border-white rounded-2xl shadow-md transition-all w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center px-4 sm:px-6 py-3 sm:py-4 text-left text-[#000000] font-inter font-semibold text-xl sm:text-[17px] focus:outline-none"
                >
                  {activeIndex === i ? (
                    <X className="w-6 h-6 mr-3 shrink-0 text-[#F63F00] font-semibold" />
                  ) : (
                    <Plus className="w-6 h-6 mr-3 shrink-0 text-[#F63F00] font-semibold" />
                  )}
                  <span>{faq.question}</span>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-[#000000] text-lg font-inter leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

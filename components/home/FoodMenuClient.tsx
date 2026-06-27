"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Props {
  categories: string[];
  itemsByCategory: Record<string, MenuItem[]>;
}

export default function FoodMenuClient({ categories, itemsByCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "");

  if (categories.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      id="menu"
      className="text-white my-5 pt-10"
    >
      <div className="w-full mx-auto rounded-[50px] md:max-h-193 bg-[#0A0A0A] sm:p-8 lg:p-12 py-10">
        {/* Top Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full mb-6 sm:mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image src="/food.svg" alt="Menu" width={18} height={18} />
              <span className="text-[#F63F00] font-geist font-medium">Food Menu</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-geist font-bold mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="text-gray-400">Our Delicious</span>
              <br />
              <span className="text-white">Food Menu</span>
            </motion.h1>
          </div>

          <motion.div
            className="max-w-97.5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="text-[#FFFFFF] lg:text-2xl text-sm md:text-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed text-center md:text-left">
              Explore a variety of tasty bites, refreshing drinks, and healthy treats.
            </p>
          </motion.div>
        </motion.div>

        {/* Grid Section */}
        <div className="flex md:flex-row flex-col gap-8 lg:gap-12">
          {/* Left Section: Categories */}
          <div className="flex-1">
            <div className="px-4 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full text-sm sm:text-base md:text-lg font-geist font-medium transition-all ${
                    activeCategory === category
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-[#FFFFFF]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section: Menu Items */}
          <div className="flex-2">
            <div className="space-y-4 sm:space-y-6 max-h-87.5 sm:max-h-100 md:max-h-125 overflow-auto pr-2">
              {(itemsByCategory[activeCategory] || []).map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl p-4 hover:bg-zinc-750 transition-colors"
                >
                  <div className="shrink-0">
                    <div className="w-45.25 sm:w-32 h-27.75 sm:h-24 rounded-xl overflow-hidden">
                      <Image
                        src={item.image || "/menu.png"}
                        alt={item.name}
                        width={181}
                        height={112}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 sm:gap-4 mb-1 sm:mb-2">
                      <h3 className="text-base sm:text-lg md:text-2xl font-bold font-geist text-white truncate">
                        {item.name}
                      </h3>
                      <span className="text-base sm:text-xl font-geist text-white whitespace-nowrap">
                        ৳ {item.price}
                      </span>
                    </div>
                    <p className="text-[#FFFFFF] text-xs font-geist sm:text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              {(itemsByCategory[activeCategory] || []).length === 0 && (
                <p className="text-gray-500 text-sm py-10 text-center">No items in this category yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

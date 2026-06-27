"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

export default function MenuPageClient({ categories, itemsByCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const allCategories = ["All", ...categories];

  const displayItems =
    activeCategory === "All"
      ? Object.values(itemsByCategory).flat()
      : itemsByCategory[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="bg-[#0A2C23] pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full mb-5 border border-white/20"
        >
          <Image src="/food.svg" alt="Menu" width={14} height={14} />
          <span className="text-[#F63F00] font-geist font-medium text-xs sm:text-sm">
            Food Menu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-geist font-bold text-white mb-3 leading-tight"
        >
          Our Delicious Menu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-white/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
        >
          Fresh bites, refreshing drinks, and healthy treats — all in one place.
        </motion.p>
      </div>

      {/* ── Category Filter ── */}
      <div className="px-4 sm:px-8 lg:px-16 -mt-5 mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 px-4 py-3"
        >
          {/* scrollable on mobile, centered on desktop */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto sm:flex-wrap sm:justify-center scrollbar-hide pb-0.5"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-geist font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#F63F00] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Items ── */}
      <div className="px-4 sm:px-8 lg:px-16 pb-20">
        {displayItems.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mx-auto mb-4">
              <Image src="/food.svg" alt="" width={28} height={28} />
            </div>
            <p className="text-gray-400 text-base font-geist">No items available yet.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {/* Mobile: horizontal card list */}
              <div className="flex flex-col gap-4 sm:hidden">
                {displayItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.04 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm flex overflow-hidden"
                  >
                    {/* Image — fixed square on left */}
                    <div className="relative shrink-0 w-28 h-28">
                      <Image
                        src={item.image && item.image !== "/menu.png" ? item.image : "/menu.png"}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                        unoptimized={item.image?.startsWith("http")}
                      />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-center p-3 flex-1 min-w-0">
                      <span className="text-[10px] font-semibold font-geist text-[#F63F00] uppercase tracking-wide mb-1">
                        {item.category}
                      </span>
                      <h3 className="text-sm font-bold font-geist text-gray-900 leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                      <span className="text-[#F63F00] font-geist font-bold text-sm mt-2">
                        ৳{item.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tablet / Desktop: grid cards */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                      <Image
                        src={item.image && item.image !== "/menu.png" ? item.image : "/menu.png"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={item.image?.startsWith("http")}
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold font-geist px-3 py-1 rounded-full shadow-sm">
                        {item.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-sm font-bold font-geist text-gray-900 leading-snug">
                          {item.name}
                        </h3>
                        <span className="text-[#F63F00] font-geist font-bold text-sm whitespace-nowrap">
                          ৳{item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

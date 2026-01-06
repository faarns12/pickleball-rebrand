"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Product Data
const productsData = [
  { id: 1, name: "Pro Performance Jersey", category: "Jersey", price: 89.99, image: "/store-06.png", description: "Breathable moisture-wicking fabric" },
  { id: 2, name: "Pro Performance Jersey", category: "Jersey", price: 89.99, image: "/store-06.png", description: "Breathable moisture-wicking fabric" },
  { id: 3, name: "Pro Performance Jersey", category: "Jersey", price: 89.99, image: "/store-06.png", description: "Breathable moisture-wicking fabric" },
  { id: 4, name: "Elite Court Jersey", category: "Jersey", price: 79.99, image: "/store-06.png", description: "Lightweight and comfortable" },
  { id: 5, name: "Champion Jersey", category: "Jersey", price: 99.99, image: "/store-06.png", description: "Premium quality design" },
  { id: 6, name: "Champion Jersey", category: "Accessories", price: 99.99, image: "/store-03.png", description: "Premium quality design" },
  { id: 7, name: "Champion Shoe", category: "Shoes", price: 99.99, image: "/store-04.png", description: "Premium quality design" },
  { id: 8, name: "Champion Paddle", category: "Paddle", price: 99.99, image: "/store-10.png", description: "Premium quality design" },
];

const categories = ["All", "Jersey", "Paddle", "Shoes", "Accessories"];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("Jersey");
  const [sortOrder, setSortOrder] = useState("high-to-low");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse wheel scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel);
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // Drag-to-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("cursor-grabbing");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove("cursor-grabbing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // Filter and sort
  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter(product => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "high-to-low" ? b.price - a.price : a.price - b.price
  );

  const displayProducts = sortedProducts;

  return (
    <motion.section
      id="store"
      className="text-white my-5 pt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full mx-auto rounded-[50px] bg-[#0A0A0A] py-10 sm:p-8 lg:p-12">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 px-4 text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full mb-6 mx-auto md:mx-0 justify-center md:justify-start">
              <Image src="/food.svg" alt="Store" width={18} height={18} />
              <span className="text-[#F63F00] font-medium">Store</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
              <span className="text-gray-400">Premium Products for</span>
              <br />
              <span className="text-white">Pickleball Passionate</span>
            </h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-2xl max-w-xl mt-4 md:mt-0 mx-auto md:mx-0 md:text-right">
            Gear up with high-quality equipment built for comfort and durability.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-45 bg-white text-black rounded-lg">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-45 bg-white text-black rounded-lg">
              <SelectValue placeholder="Sort by price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-to-low">Price high to low</SelectItem>
              <SelectItem value="low-to-high">Price low to high</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Products Horizontal Scroll */}
        <motion.div
          className="relative px-4 my-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div
            ref={scrollRef}
            className="flex flex-nowrap gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar cursor-grab"
          >
            {displayProducts.map(product => (
              <motion.div
                key={product.id}
                className="snap-start shrink-0 w-55 sm:w-65 md:w-75 bg-white text-black rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-full h-50 mb-4 rounded-xl overflow-hidden">
                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{product.name}</h3>
                <p className="text-black font-bold mt-2">${product.price}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {displayProducts.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No products found in this category.
          </div>
        )}
      </div>
    </motion.section>
  );
}

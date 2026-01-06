"use client";

import Image from "next/image";
import { useState, useRef,  } from "react";
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
  {
    id: 1,
    name: "AeroFlex Match Jersey",
    category: "Jersey",
    price: 449.99,
    image: "/product1.png",
    description: "Ultra-light fabric engineered for breathability and speed.",
  },
  {
    id: 2,
    name: "AeroFlex Match Jersey",
    category: "Jersey",
    price: 399.99,
    image: "/product2.png",
    description: "Sweat-resistant performance jersey for intense gameplay.",
  },
  {
    id: 3,
    name: "AeroFlex Match Jersey",
    category: "Jersey",
    price: 299.99,
    image: "/product3.png",
    description: "Flexible fit design that keeps you cool and dry.",
  },
  {
    id: 4,
    name: "Elite Court Training Jersey",
    category: "Jersey",
    price: 374.99,
    image: "/product4.png",
    description: "Soft-touch fabric built for comfort during long sessions.",
  },
  {
    id: 5,
    name: "Champion Pro Series Jersey",
    category: "Jersey",
    price: 594.99,
    image: "/product5.png",
    description: "Premium stitched jersey with a professional finish.",
  },
  {
    id: 6,
    name: "Champion Performance Wristband",
    category: "Accessories",
    price: 670.99,
    image: "/store-03.png",
    description: "High-absorbency wristband for maximum control.",
  },
  {
    id: 7,
    name: "Champion Court Master Shoes",
    category: "Shoes",
    price: 1570.99,
    image: "/store-04.png",
    description: "Court-grip sole with superior ankle support.",
  },
  {
    id: 8,
    name: "Champion Carbon Power Paddle",
    category: "Paddle",
    price: 1490.99,
    image: "/store-10.png",
    description: "Precision-balanced paddle built for power and control.",
  },
];


const categories = ["All", "Jersey", "Paddle", "Shoes", "Accessories"];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("Jersey");
  const [sortOrder, setSortOrder] = useState("high-to-low");
  const scrollRef = useRef<HTMLDivElement>(null);




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
  className="relative px-4 my-6 overflow-hidden"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7 }}
>
  <motion.div
    ref={scrollRef}
    className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
    drag="x"
    dragConstraints={{ left: -((displayProducts.length * 280) - 800), right: 0 }}
  >
    {displayProducts.map(product => (
      <motion.div
        key={product.id}
        className="shrink-0 w-65 sm:w-70 md:w-75 px-2 bg-white text-black rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform"
      >
        <div className="relative w-full h-55 mb-4 rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
          {product.name}
        </h3>

        <p className="font-bold mt-2">৳ {product.price}</p>
      </motion.div>
    ))}
  </motion.div>
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

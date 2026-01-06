"use client";
import React, { useState } from "react";
import Image from "next/image";

// JSON Data
const menuData = {
  categories: [
    { id: "quick-bites", name: "Quick Bites" },
    { id: "healthy-snacks", name: "Healthy Snacks" },
    { id: "set-meals", name: "Set Meals" },
    { id: "beverages", name: "Beverages" },
    { id: "hot-drinks", name: "Hot Drinks" },
    { id: "sweet-treats", name: "Sweet Treats" },
  ],
  items: {
    "quick-bites": [
      {
        id: 1,
        name: "Chicken Sandwich",
        description:
          "Grilled chicken, fresh veggies, and mayo on whole wheat bread.",
        price: 550,
        image: "/menu.png",
      },
      {
        id: 2,
        name: "Chicken Sandwich",
        description:
          "Grilled chicken, fresh veggies, and mayo on whole wheat bread.",
        price: 550,
        image: "/menu.png",
      },
      {
        id: 3,
        name: "Chicken Sandwich",
        description:
          "Grilled chicken, fresh veggies, and mayo on whole wheat bread.",
        price: 550,
        image: "/menu.png",
      },
      {
        id: 4,
        name: "Chicken Sandwich",
        description:
          "Grilled chicken, fresh veggies, and mayo on whole wheat bread.",
        price: 550,
        image: "/menu.png",
      },
    ],
    "healthy-snacks": [
      {
        id: 5,
        name: "Fresh Fruit Bowl",
        description: "Seasonal fruits with honey drizzle.",
        price: 350,
        image: "/menu.png",
      },
    ],
    "set-meals": [
      {
        id: 6,
        name: "Combo Meal",
        description: "Burger, fries, and drink.",
        price: 850,
        image: "/menu.png",
      },
    ],
    beverages: [
      {
        id: 7,
        name: "Fresh Juice",
        description: "Orange or mixed fruit juice.",
        price: 250,
        image: "/menu.png",
      },
    ],
    "hot-drinks": [
      {
        id: 8,
        name: "Coffee",
        description: "Freshly brewed coffee.",
        price: 150,
        image: "/menu.png",
      },
    ],
    "sweet-treats": [
      {
        id: 9,
        name: "Chocolate Cake",
        description: "Rich chocolate cake slice.",
        price: 400,
        image: "/menu.png",
      },
    ],
  },
};

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("quick-bites");

  return (
    <div id="menu" className="text-white pt-10 my-5 ">
      <div className="w-full mx-auto rounded-[50px] md:max-h-193 bg-[#0A0A0A]  sm:p-8 lg:p-12 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-0">
          <div>
            {/* Food Menu Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full mb-6 sm:mb-8">
              <Image src="/food.svg" alt="Blog" width={18} height={18} />
              <span className="text-[#F63F00] font-geist font-medium">Food Menu</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-geist font-bold mb-4  lg:mb-6">
              <span className="text-gray-400">Our Delicious</span>
              <br />
              <span className="text-white">Food Menu</span>
            </h1>
          </div>
          <div className="max-w-97.5">
            <p className="text-[#FFFFFF] lg:text-2xl text-sm md:text-lg mb-4   sm:mb-6 md:mb-8 leading-relaxed text-center md:text-left">
              Explore a variety of tasty bites, refreshing drinks, and healthy
              treats.
            </p>
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex md:flex-row flex-col gap-8 lg:gap-12">
          {/* Left Section: Categories */}
          <div className="flex-1">
            <div className=" px-4 space-y-3 ">
              {menuData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full text-sm sm:text-base md:text-lg font-geist font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-[#FFFFFF]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section: Menu Items */}
          <div className="flex-2">
            <div className="space-y-4 sm:space-y-6 max-h-87.5 sm:max-h-100 md:max-h-125 overflow-auto pr-2">
              {menuData.items[activeCategory as keyof typeof menuData.items]?.map(
                (item) => (
                  <div
                    key={item.id}
                    className="flex gap-4  rounded-2xl p-4 hover:bg-zinc-750 transition-colors"
                  >
                    {/* Image */}
                    <div className="shrink-0">
                      <div className="w-45.25 sm:w-32 h-27.75 sm:h-24  rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={181}
                          height={112}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 sm:gap-4 mb-1 sm:mb-2">
                        <h3 className="text-base sm:text-lg md:text-2xl font-bold font-geist text-white truncate">
                          {item.name}
                        </h3>
                        <span className="text-base sm:text-xl font-geist text-white whitespace-nowrap">
                          ৳ {item.price}
                        </span>
                      </div>
                      <p className="text-[#FFFFFF] text-xs font-geist  sm:text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

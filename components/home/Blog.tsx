"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, } from 'lucide-react';

// Blog data in JSON format
const blogsData = [
  {
    id: 1,
    category: "Lifestyle",
    date: "Apr 5, 2025",
    title: "How to play Pickleball? A detailed guide",
    image: "/blog.jpg",
    slug: "how-to-play-pickleball-guide"
  },
  {
    id: 2,
    category: "Lifestyle",
    date: "Apr 5, 2025",
    title: "How to play Pickleball? A detailed guide",
  image: "/blog.jpg",
    slug: "how-to-play-pickleball-guide-2"
  },
  {
    id: 3,
    category: "Lifestyle",
    date: "Apr 5, 2025",
    title: "How to play Pickleball? A detailed guide",
  image: "/blog.jpg",
    slug: "how-to-play-pickleball-guide-3"
  }
];

const Blogs = () => {
  return (
    <section className=" py-16 px-2">
      <div className="w-full mx-auto">
        {/* Top Badge */}
       <div className="mb-6">
  <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist">
    <Image src="/blog.svg" alt="Blog" width={18} height={18} />
    <span className="font-medium">Blogs</span>
  </div>
</div>


        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="md:text-4xl text-2xl lg:text-6xl font-bold">
            <span className="text-[#707070] font-geist">Pickle</span>
            <span className="text-[#0A0A0A] font-geist"> Blogs</span>
          </h2>
          
          <Link 
            href="/blogs"
            className="flex items-center text-base font-geist  bg-[#F7F7F7] px-3 py-2 rounded-[14px] gap-2 text-[#141414] hover:text-black font-medium transition-colors group"
          >
            <span>All Blog</span>
            <div className="w-8 h-8 rounded-full border-2 border-gray-700 group-hover:border-black flex items-center justify-center transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogsData.map((blog) => (
            <Link 
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group"
            >
              <div className=" flex flex-col gap-2  overflow-hidden  transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 rounded-4xl overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 bg-[#F7F7F7] rounded-4xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#F63F00] font-geist font-medium text-sm px-3.5 py-2.5 bg-[#FFFFFF] rounded-full">
                      {blog.category}
                    </span>
                    <span className="text-[#1F1F1F] font-geist font-medium text-sm">
                      {blog.date}
                    </span>
                  </div>
                  
                  <h3 className="lg:text-2xl text-xl font-semibold font-geist text-[#0A0A0A] group-hover:text-orange-600 transition-colors">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
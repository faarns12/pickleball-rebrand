"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogs } from "@/lib/blogs";

const Blogs = () => {
  return (
    <motion.section
      className="py-16 px-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full mx-auto">

        {/* Top Badge */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist">
            <Image src="/book-open-check.svg" alt="Blog" width={18} height={18} />
            <span className="font-medium">Blogs</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="md:text-4xl text-2xl lg:text-6xl font-bold">
            <span className="text-[#707070] font-geist">Pickle</span>
            <span className="text-[#0A0A0A] font-geist"> Blogs</span>
          </h2>
          
          <Link 
            href="/blogs"
            className="flex items-center text-base font-geist bg-[#F7F7F7] px-3 py-2 rounded-[14px] gap-2 text-[#141414] hover:text-black font-medium transition-colors group"
          >
            <span>All Blog</span>
            <div className="w-8 h-8 rounded-full border-2 border-gray-700 group-hover:border-black flex items-center justify-center transition-colors">
              <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link href={`/blog/${blog.id}`} className="group">
                <div className="flex flex-col gap-2 overflow-hidden transition-all duration-300">
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
                  <div className="p-6 bg-[#F7F7F7] rounded-4xl min-h-50">
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Blogs;

"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Blog } from "@/types/blog";

const Blogs = ({ blogs }: { blogs: Blog[] }) => {
  const latest = blogs.slice(0, 4);

  return (
    <motion.section
      className="py-16 px-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full mx-auto" id="blog">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#FFF1ED] text-[#F63F00] px-4 py-1.5 rounded-full font-geist text-sm font-semibold">
            <Image src="/book-open-check.svg" alt="Blog" width={16} height={16} />
            <span>Blogs</span>
          </div>
        </motion.div>

        <motion.div
          className="flex items-end justify-between mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="md:text-4xl text-2xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#707070] font-geist">Pickle</span>
            <span className="text-[#0A0A0A] font-geist"> Blogs</span>
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-geist font-semibold text-[#141414] hover:text-[#F63F00] transition-colors duration-200 group"
          >
            <span>View all</span>
            <div className="w-7 h-7 rounded-full border border-gray-300 group-hover:border-[#F63F00] group-hover:bg-[#FFF1ED] flex items-center justify-center transition-all duration-200">
              <ArrowRight size={14} />
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.id}`} className="group block h-full">
                <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#F63F00] text-[11px] font-bold font-geist uppercase tracking-wide">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-4 gap-2">
                    <p className="text-[11px] font-geist text-gray-400 font-medium">{blog.date}</p>
                    <h3 className="text-[0.95rem] font-semibold font-geist text-[#0A0A0A] leading-snug group-hover:text-[#F63F00] transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-geist text-gray-400">{blog.readingTime ?? "2 min read"}</span>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-[#F63F00] group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
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

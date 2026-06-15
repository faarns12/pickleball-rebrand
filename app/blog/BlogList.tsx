"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Blog } from "@/types/blog";

const ALL = "All";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function PaddleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="9" cy="9" rx="7" ry="7" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="14" x2="21" y2="21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function HeroCard({ blog }: { blog: Blog }) {
  return (
    <motion.div variants={heroVariants} initial="hidden" animate="visible" className="w-full">
      <Link href={`/blog/${blog.id}`} className="group block">
        <div
          className="relative w-full overflow-hidden rounded-[28px] shadow-xl shadow-black/10"
          style={{ height: "clamp(320px, 50vh, 560px)" }}
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 via-emerald-500 to-green-400" />
          <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-[11px] font-bold font-satoshi uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                {blog.category}
              </span>
              <span className="text-white/60 text-xs font-satoshi">{blog.readingTime}</span>
              <span className="ml-auto text-white/50 text-xs font-satoshi hidden md:block">{blog.date}</span>
            </div>
            <h2 className="font-figtree text-2xl md:text-4xl font-extrabold text-white leading-[1.18] tracking-tight mb-3 max-w-2xl">
              {blog.title}
            </h2>
            <p className="font-satoshi text-white/70 text-sm md:text-base leading-relaxed max-w-xl mb-5 line-clamp-2">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center shrink-0">
                <span className="font-figtree font-black text-white text-xs">MT</span>
              </div>
              <span className="font-satoshi text-white/80 text-sm font-medium">{blog.author}</span>
              <div className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-950 text-sm font-semibold font-satoshi group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                Read Article
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <motion.div key={blog.id} variants={cardVariants} layout className="group">
      <Link href={`/blog/${blog.id}`} className="block h-full">
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/[0.08] hover:-translate-y-1.5 transition-all duration-400 overflow-hidden h-full flex flex-col">
          <div className="relative overflow-hidden" style={{ height: "clamp(180px, 22vw, 240px)" }}>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-bold font-satoshi uppercase tracking-widest border border-green-200/60">
                {blog.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-satoshi">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {blog.readingTime}
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-figtree text-[1.05rem] md:text-[1.15rem] font-extrabold text-gray-950 leading-snug mb-2.5 group-hover:text-green-700 transition-colors duration-300 line-clamp-2">
              {blog.title}
            </h3>
            <p className="font-satoshi text-gray-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
              {blog.excerpt}
            </p>
            <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100">
              <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center shrink-0">
                <span className="font-figtree font-black text-white text-[10px]">MT</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-satoshi font-semibold text-gray-800 text-xs leading-tight truncate">{blog.author}</p>
                <p className="font-satoshi text-gray-400 text-[11px] mt-0.5">{blog.date}</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-green-500 flex items-center justify-center transition-colors duration-300 shrink-0">
                <svg className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  const categories = [ALL, ...Array.from(new Set(blogs.map((b) => b.category)))];
  const [activeCategory, setActiveCategory] = useState(ALL);

  const featured = blogs[0];
  const rest = blogs.slice(1);
  const filtered = activeCategory === ALL ? rest : rest.filter((b) => b.category === activeCategory);

  if (!featured) {
    return (
      <section id="blog" className="w-full bg-[#F7F8F5] py-20 md:py-28">
        <div className="w-11/12 md:w-10/12 max-w-6xl mx-auto flex flex-col items-center justify-center py-20 gap-4">
          <PaddleIcon className="w-14 h-14 text-gray-300" />
          <p className="font-figtree text-gray-400 text-lg font-semibold">No articles yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="w-full bg-[#F7F8F5] py-20 md:py-28">
      <div className="w-11/12 md:w-10/12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-px h-5 bg-green-500 rounded-full" />
              <span className="font-satoshi text-green-600 text-xs font-bold uppercase tracking-[0.18em]">From the Court</span>
            </div>
            <h2 className="font-figtree text-4xl md:text-5xl font-extrabold text-gray-950 leading-[1.1] tracking-tight">
              Latest from
              <br />
              <span className="text-green-600">Pickleball Bangladesh</span>
            </h2>
          </div>
          <div className="opacity-[0.06] hidden md:block">
            <PaddleIcon className="w-28 h-28 text-green-900" />
          </div>
        </motion.div>

        <HeroCard blog={featured} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2.5 flex-wrap mt-12 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-satoshi transition-all duration-250 border ${
                activeCategory === cat
                  ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-500/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto font-satoshi text-gray-400 text-sm hidden md:block">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
            >
              <PaddleIcon className="w-14 h-14 text-gray-300" />
              <p className="font-figtree text-gray-400 text-lg font-semibold">No articles in this category yet.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-[28px] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute right-16 -bottom-8 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
          <div className="relative z-10">
            <p className="font-satoshi text-green-200 text-xs font-bold uppercase tracking-widest mb-2">Come Play With Us</p>
            <h3 className="font-figtree text-2xl md:text-3xl font-extrabold text-white leading-snug">
              Ready for your first
              <br className="hidden md:block" /> pickleball session?
            </h3>
            <p className="font-satoshi text-green-100/80 text-sm mt-2">Rooftop, Haque Tower · Jubilee Road, Chattogram</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:01886446610"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-green-700 text-sm font-bold font-satoshi hover:bg-green-50 transition-colors duration-200 shadow-lg shadow-black/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Book a Session
            </a>
            <Link
              href="/#blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold font-satoshi hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
            >
              View All Posts
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

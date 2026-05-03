/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Blog } from "@/types/blog";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/* ─────────────────────────────────────────────
   READING PROGRESS BAR
───────────────────────────────────────────── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-green-500 to-emerald-400 z-50 origin-left"
    />
  );
}

/* ─────────────────────────────────────────────
   HERO IMAGE with parallax
───────────────────────────────────────────── */
function HeroImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(320px, 55vh, 620px)" }}
    >
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill className="object-cover" priority />
        {/* cinematic dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTENT PARSER — markdown-lite
───────────────────────────────────────────── */
function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-0">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <motion.h2
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="font-figtree text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 leading-tight"
            >
              {line.replace("## ", "")}
            </motion.h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <motion.h3
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="font-figtree text-xl font-semibold text-gray-800 mt-8 mb-3"
            >
              {line.replace("### ", "")}
            </motion.h3>
          );
        }
        if (line.startsWith("> ")) {
          return (
            <motion.blockquote
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="my-8 pl-6 border-l-4 border-green-500"
            >
              <p className="font-figtree text-xl md:text-2xl italic text-gray-700 leading-relaxed">
                {line.replace("> ", "")}
              </p>
            </motion.blockquote>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <motion.li
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="ml-4 font-satoshi text-gray-700 leading-8 text-[17px] list-none flex items-start gap-2 mb-1"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {line.replace("- ", "")}
            </motion.li>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-3" />;
        return (
          <motion.p
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="font-satoshi text-gray-700 leading-8 text-[17px] mb-5"
          >
            {line}
          </motion.p>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function BlogDetails({ blog }: { blog: Blog }) {
  const tags = blog.tags ?? ["Design", "Insights", "Strategy"];

  return (
    <>
      <ReadingProgress />

      <main className="w-full min-h-screen bg-[#FAFAF8]">
        {/* ── HERO ─────────────────────────────── */}
        <HeroImage src={blog.image} alt={blog.title} />

        {/* ── FLOATING CARD HEADER ─────────────── */}
        <div className="w-full max-w-3xl mx-auto px-5 md:px-0 -mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-2xl shadow-black/10 px-8 md:px-14 pt-10 pb-8"
          >
            {/* Category chip + reading time */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold font-satoshi tracking-wide uppercase">
                {blog.category}
              </span>
              <span className="text-gray-400 text-sm font-satoshi">
                {blog.readingTime}
              </span>
            </div>

            {/* Title */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="font-figtree text-3xl md:text-[2.6rem] font-extrabold text-gray-950 leading-[1.15] tracking-tight mb-6"
            >
              {blog.title}
            </motion.h1>

            {/* Divider */}
            <div className="w-12 h-[3px] bg-green-500 rounded-full mb-6" />

            {/* Author row */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 overflow-hidden shrink-0 relative">
                {blog.authorAvatar ? (
                  <Image
                    src={blog.authorAvatar}
                    alt={blog.author}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-700 font-bold text-sm font-figtree">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-satoshi font-semibold text-gray-900 text-sm leading-tight">
                  {blog.author}
                </p>
                <p className="font-satoshi text-gray-400 text-xs mt-0.5">
                  {blog.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── BODY ─────────────────────────────── */}
        <div className="w-full max-w-3xl mx-auto px-5 md:px-0 mt-12 pb-24">
          {/* Article content */}
          <article className="bg-white rounded-3xl shadow-sm border border-gray-100 px-8 md:px-14 py-12">
            <BlogContent content={blog.content} />

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.72, ease: "easeOut" }}
                className="mt-14 pt-8 border-t border-gray-100 flex flex-wrap gap-2"
              >
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-satoshi hover:bg-green-50 hover:text-green-700 hover:border-green-200 border border-transparent transition-all duration-200 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </article>

          {/* ── AUTHOR BIO CARD ─────────────────── */}
          {blog.authorBio && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.72, ease: "easeOut" }}
              className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-sm px-8 py-8 flex gap-5 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 border-2 border-green-200 overflow-hidden shrink-0 relative">
                {blog.authorAvatar ? (
                  <Image
                    src={blog.authorAvatar}
                    alt={blog.author}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-700 font-bold text-xl font-figtree">
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-figtree font-bold text-gray-900 text-base mb-0.5">
                  {blog.author}
                </p>
                <p className="font-satoshi text-gray-500 text-sm leading-relaxed">
                  {blog.authorBio}
                </p>
              </div>
            </motion.div>
          )}

          {/* ── BACK BUTTON ──────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.72, ease: "easeOut" }}
            className="mt-8 flex justify-start"
          >
            <Link
              href="/#blog"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gray-950 text-white text-sm font-semibold font-satoshi hover:bg-green-600 transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-green-500/20"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}

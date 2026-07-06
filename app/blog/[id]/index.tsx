/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Blog } from "@/types/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-0.75 bg-linear-to-r from-green-500 to-emerald-400 z-50 origin-left"
    />
  );
}

function HeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full bg-[#F5F5F3]">
      <div className="relative w-full max-w-5xl mx-auto" style={{ aspectRatio: "16/9" }}>
        <Image src={src} alt={alt} fill className="object-contain" priority />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/60" />
      </div>
    </div>
  );
}

function BlogContent({ content }: { content: string }) {
  const isHtml = content.trimStart().startsWith("<");

  if (isHtml) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rich-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const lines = content.split("\n");
  return (
    <div className="space-y-0">
      {lines.map((line, i) => {
        if (line.startsWith("## "))
          return (
            <motion.h2 key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
              className="font-figtree text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-4 leading-tight">
              {line.replace("## ", "")}
            </motion.h2>
          );
        if (line.startsWith("### "))
          return (
            <motion.h3 key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
              className="font-figtree text-xl font-semibold text-gray-800 mt-8 mb-3">
              {line.replace("### ", "")}
            </motion.h3>
          );
        if (line.startsWith("> "))
          return (
            <motion.blockquote key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
              className="my-8 pl-5 border-l-[3px] border-green-500 bg-green-50/50 py-3 rounded-r-lg">
              <p className="font-figtree text-lg italic text-gray-700 leading-relaxed">
                {line.replace("> ", "")}
              </p>
            </motion.blockquote>
          );
        if (line.startsWith("- "))
          return (
            <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
              className="ml-2 font-satoshi text-gray-700 leading-8 text-[17px] list-none flex items-start gap-3 mb-2">
              <span className="mt-3 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
              {line.replace("- ", "")}
            </motion.li>
          );
        if (line.trim() === "") return <div key={i} className="h-4" />;
        return (
          <motion.p key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}
            className="font-satoshi text-gray-700 leading-8 text-[17px] mb-5">
            {line}
          </motion.p>
        );
      })}
    </div>
  );
}

export default function BlogDetails({ blog }: { blog: Blog }) {
  const tags = blog.tags ?? [];

  return (
    <>
      <ReadingProgress />

      <main className="w-full min-h-screen bg-[#F5F5F3]">

        {/* HERO */}
        <HeroImage src={blog.image} alt={blog.title} />

        {/* HEADER CARD — floats over hero bottom */}
        <div className="w-full max-w-3xl mx-auto px-4 md:px-0 -mt-32 relative z-10 pb-0">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl shadow-2xl shadow-black/15 px-7 md:px-12 pt-8 pb-7"
          >
            {/* Breadcrumb */}
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-green-600 text-xs font-satoshi font-medium mb-5 transition-colors group">
              <svg className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>

            {/* Category + meta row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500 text-white text-[10px] font-bold font-satoshi uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                {blog.category}
              </span>
              <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-satoshi">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {blog.readingTime}
              </span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-gray-400 text-xs font-satoshi">{blog.date}</span>
            </div>

            {/* Title */}
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="font-figtree text-2xl md:text-[2.2rem] font-extrabold text-gray-950 leading-[1.18] tracking-tight mb-5"
            >
              {blog.title}
            </motion.h1>

            <div className="w-10 h-0.75 bg-green-500 rounded-full mb-6" />

            {/* Author */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeIn}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-green-600 border-2 border-green-200 overflow-hidden shrink-0 relative flex items-center justify-center">
                {blog.authorAvatar ? (
                  <Image src={blog.authorAvatar} alt={blog.author} fill className="object-cover" />
                ) : (
                  <span className="font-figtree font-black text-white text-sm">
                    {blog.author.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-satoshi font-semibold text-gray-900 text-sm leading-tight">{blog.author}</p>
                <p className="font-satoshi text-gray-400 text-[11px] mt-0.5">Pickleball Bangladesh</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ARTICLE BODY */}
        <div className="w-full max-w-3xl mx-auto px-4 md:px-0 mt-5 pb-24">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100/80 px-7 md:px-12 py-10"
          >
            <BlogContent content={blog.content} />

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} transition={{ duration: 0.6 }}
                className="mt-12 pt-7 border-t border-gray-100 flex flex-wrap gap-2"
              >
                <p className="w-full text-xs font-satoshi font-semibold text-gray-400 uppercase tracking-widest mb-1">Tags</p>
                {tags.map((tag) => (
                  <span key={tag}
                    className="px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-satoshi hover:bg-green-50 hover:text-green-700 border border-transparent hover:border-green-200 transition-all duration-200 cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.article>

          {/* AUTHOR BIO */}
          {blog.authorBio && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} transition={{ duration: 0.6 }}
              className="mt-4 bg-white rounded-3xl border border-gray-100 shadow-sm px-7 py-6 flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-600 border-2 border-green-100 overflow-hidden shrink-0 relative flex items-center justify-center">
                {blog.authorAvatar ? (
                  <Image src={blog.authorAvatar} alt={blog.author} fill className="object-cover" />
                ) : (
                  <span className="font-figtree font-black text-white text-lg">
                    {blog.author.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-satoshi text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Written by</p>
                <p className="font-figtree font-bold text-gray-900 text-base mb-1">{blog.author}</p>
                <p className="font-satoshi text-gray-500 text-sm leading-relaxed">{blog.authorBio}</p>
              </div>
            </motion.div>
          )}

          {/* BACK BUTTON */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp} transition={{ duration: 0.6 }}
            className="mt-6 flex items-center justify-between"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-950 text-white text-sm font-semibold font-satoshi hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-green-500/20"
            >
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
            <Link
              href="/"
              className="text-xs font-satoshi text-gray-400 hover:text-green-600 transition-colors"
            >
              pickleball.com.bd
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}

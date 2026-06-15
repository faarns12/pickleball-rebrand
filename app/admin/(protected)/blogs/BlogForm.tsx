"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const TiptapEditor = dynamic(
  () => import("@/components/admin/TiptapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <div className="h-12 bg-gray-50 border-b border-gray-200 animate-pulse" />
        <div className="h-80 bg-white animate-pulse" />
      </div>
    ),
  }
);

interface BlogFormData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  image?: string;
  category?: string;
  date?: string;
  author?: string;
  reading_time?: string;
  tags?: string;
  is_active?: boolean;
}

interface BlogFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: BlogFormData;
  submitLabel: string;
}

const CATEGORIES = ["Sports", "Training", "News", "Tips", "Events"];

export default function BlogForm({ action, initialData, submitLabel }: BlogFormProps) {
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState(initialData?.content || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content || content === "<p></p>") {
      setError("Content is required.");
      return;
    }
    setPending(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", isActive ? "true" : "false");
    formData.set("image", imageUrl || "/blog11.jpg");
    formData.set("content", content);
    try {
      await action(formData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
          <input
            name="title"
            defaultValue={initialData?.title}
            required
            placeholder="Blog post title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
          <input
            name="slug"
            defaultValue={initialData?.slug}
            placeholder="auto-generated-from-title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
          <select
            name="category"
            defaultValue={initialData?.category || "Sports"}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
          <input
            name="date"
            defaultValue={initialData?.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            required
            placeholder="January 1, 2025"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
          <input
            name="author"
            defaultValue={initialData?.author || "Pickleball"}
            placeholder="Pickleball"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Reading Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Reading Time</label>
          <input
            name="reading_time"
            defaultValue={initialData?.reading_time || "5 min read"}
            placeholder="5 min read"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`relative w-full h-40 border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-colors ${
              uploading ? "opacity-60 cursor-wait" : "hover:border-green-400"
            } ${imageUrl ? "border-gray-200" : "border-gray-300 bg-gray-50"}`}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Blog cover"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 12l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <span className="text-sm">Click to upload cover image</span>
              </div>
            )}
            {uploading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imageUrl && !uploading && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                Click to change
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Tags <span className="text-gray-400 font-normal">(comma separated)</span>
          </label>
          <input
            name="tags"
            defaultValue={initialData?.tags}
            placeholder="Pickleball, Sports, Bangladesh"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Excerpt */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={initialData?.excerpt}
            rows={2}
            placeholder="Short description shown in blog cards..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
          />
        </div>

        {/* Rich Text Content */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Content *
          </label>
          <TiptapEditor value={content} onChange={setContent} />
        </div>

        {/* Status Toggle */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
              isActive
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
              isActive ? "border-green-600 bg-green-600" : "border-gray-400 bg-white"
            }`}>
              {isActive && (
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </span>
            {isActive ? "Active — visible to public" : "Inactive — hidden from public"}
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <a href="/admin/blogs" className="text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </a>
      </div>
    </form>
  );
}

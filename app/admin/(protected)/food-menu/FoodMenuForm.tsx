"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const CATEGORIES = [
  "Quick Bites",
  "Healthy Snacks",
  "Set Meals",
  "Beverages",
  "Hot Drinks",
  "Sweet Treats",
];

interface FoodMenuFormData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  is_active?: boolean;
}

interface FoodMenuFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: FoodMenuFormData;
  submitLabel: string;
}

export default function FoodMenuForm({ action, initialData, submitLabel }: FoodMenuFormProps) {
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
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
    setPending(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    formData.set("is_active", isActive ? "true" : "false");
    formData.set("image", imageUrl || "/menu.png");
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
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
          <input
            name="name"
            defaultValue={initialData?.name}
            required
            placeholder="Item name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
          <select
            name="category"
            defaultValue={initialData?.category || "Quick Bites"}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (৳) *</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={initialData?.price}
            required
            placeholder="350"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Image</label>
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
              <Image src={imageUrl} alt="Menu item" fill className="object-cover" unoptimized />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 12l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <span className="text-sm">Click to upload image</span>
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description"
            defaultValue={initialData?.description}
            rows={5}
            placeholder="Short description of the item..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
          />
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
        <a href="/admin/food-menu" className="text-sm text-gray-500 hover:text-gray-700">
          Cancel
        </a>
      </div>
    </form>
  );
}

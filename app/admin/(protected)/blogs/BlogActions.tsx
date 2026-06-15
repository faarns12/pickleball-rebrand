"use client";

import Link from "next/link";
import { useTransition } from "react";
import { deleteBlog, toggleBlogStatus } from "@/app/admin/actions";

export default function BlogActions({ id, is_active }: { id: number; is_active: boolean }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => toggleBlogStatus(id, !is_active));
  }

  function handleDelete() {
    if (!confirm("Permanently delete this blog? This cannot be undone.")) return;
    startTransition(() => deleteBlog(id));
  }

  return (
    <div className="flex items-center gap-2">
      {/* Toggle active */}
      <button
        onClick={handleToggle}
        disabled={isPending}
        title={is_active ? "Deactivate" : "Activate"}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
          is_active
            ? "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
            : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
        }`}
      >
        {is_active ? "Deactivate" : "Activate"}
      </button>

      {/* Edit */}
      <Link
        href={`/admin/blogs/${id}/edit`}
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        Edit
      </Link>

      {/* Delete (only for inactive) */}
      {!is_active && (
        <button
          onClick={handleDelete}
          disabled={isPending}
          title="Delete permanently"
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}

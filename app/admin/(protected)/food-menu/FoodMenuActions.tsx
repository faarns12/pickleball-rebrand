"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteFoodMenuItem, toggleFoodMenuItemStatus } from "@/app/admin/food-menu-actions";

export default function FoodMenuActions({ id, is_active }: { id: number; is_active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleFoodMenuItemStatus(id, !is_active);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Delete this menu item permanently?")) return;
    startTransition(async () => {
      await deleteFoodMenuItem(id);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={pending}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 ${
          is_active
            ? "bg-gray-100 hover:bg-gray-200 text-gray-600"
            : "bg-green-50 hover:bg-green-100 text-green-700"
        }`}
      >
        {is_active ? "Deactivate" : "Activate"}
      </button>
      <a
        href={`/admin/food-menu/${id}/edit`}
        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
      >
        Edit
      </a>
      {!is_active && (
        <button
          onClick={handleDelete}
          disabled={pending}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 hover:bg-red-100 text-red-700 transition-colors disabled:opacity-50"
        >
          Delete
        </button>
      )}
    </div>
  );
}

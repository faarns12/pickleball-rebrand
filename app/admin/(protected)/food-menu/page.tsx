import Link from "next/link";
import Image from "next/image";
import { getAllFoodMenuAdmin } from "@/app/admin/food-menu-actions";
import FoodMenuActions from "./FoodMenuActions";

export default async function AdminFoodMenuPage() {
  const items = await getAllFoodMenuAdmin();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Food Menu</h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} total · {items.filter((i) => i.is_active).length} active
          </p>
        </div>
        <Link
          href="/admin/food-menu/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Item
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M3 9h18M3 15h18M3 21h18" />
            </svg>
            <p className="text-gray-400 font-medium">No menu items yet.</p>
            <Link href="/admin/food-menu/new" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Add your first item →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Price</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={item.image || "/menu.png"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-gray-400 line-clamp-1 mt-0.5 max-w-xs">{item.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 hidden lg:table-cell">৳ {item.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.is_active
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <FoodMenuActions id={item.id} is_active={item.is_active} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

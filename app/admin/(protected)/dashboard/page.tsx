import Link from "next/link";
import { getAllBlogsAdmin } from "@/app/admin/actions";

export default async function AdminDashboard() {
  const blogs = await getAllBlogsAdmin();
  const total = blogs.length;
  const active = blogs.filter((b) => b.is_active).length;
  const inactive = total - active;
  const recent = blogs.slice(0, 5);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your blog content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard
          label="Total Blogs"
          value={total}
          color="blue"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Active Blogs"
          value={active}
          color="green"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Inactive Blogs"
          value={inactive}
          color="gray"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          }
        />
      </div>

      {/* Recent Blogs */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Blogs</h2>
          <Link href="/admin/blogs" className="text-sm text-green-600 hover:text-green-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recent.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-10">No blogs yet. Add your first blog!</p>
          )}
          {recent.map((blog) => (
            <div key={blog.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{blog.title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{blog.category} · {blog.date}</p>
              </div>
              <span
                className={`ml-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                  blog.is_active
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${blog.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                {blog.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action */}
      <div className="mt-6">
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Blog
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: "blue" | "green" | "gray";
  icon: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-100 text-blue-600",
    green: "bg-green-50 border-green-100 text-green-600",
    gray: "bg-gray-50 border-gray-100 text-gray-500",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-4 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}

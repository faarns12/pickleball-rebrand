import { createBlog } from "@/app/admin/actions";
import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <a href="/admin/blogs" className="text-sm text-gray-400 hover:text-gray-600 inline-flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </a>
        <h1 className="text-2xl font-bold text-gray-900">Add New Blog</h1>
        <p className="text-gray-500 text-sm mt-1">Create a new blog post</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <BlogForm action={createBlog} submitLabel="Publish Blog" />
      </div>
    </div>
  );
}

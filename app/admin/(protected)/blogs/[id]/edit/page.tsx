/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBlogByIdAdmin, updateBlog } from "@/app/admin/actions";
import BlogForm from "../../BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: any) {
  const id = Number((await params).id);
  const blog = await getBlogByIdAdmin(id);

  if (!blog) notFound();

  const action = updateBlog.bind(null, id);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <a href="/admin/blogs" className="text-sm text-gray-400 hover:text-gray-600 inline-flex items-center gap-1 mb-3">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blogs
        </a>
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
        <p className="text-gray-500 text-sm mt-1 truncate max-w-md">{blog.title}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <BlogForm
          action={action}
          submitLabel="Save Changes"
          initialData={{
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            image: blog.image,
            category: blog.category,
            date: blog.date,
            author: blog.author,
            reading_time: blog.reading_time,
            tags: (blog.tags || []).join(", "),
            is_active: blog.is_active,
          }}
        />
      </div>
    </div>
  );
}

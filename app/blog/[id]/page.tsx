/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { blogs } from "@/lib/blogs";
import BlogDetailsPage from "./index";
import { Blog } from "@/types/blog";

/* =========================
   Metadata
========================= */
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const baseUrl = "https://www.pickleballbangladesh.com";

  const blogId = Number((await params).id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog you are looking for does not exist.",
    };
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      url: `${baseUrl}/blog/${blog.id}`,
      siteName: "Pickleball Bangladesh",
      images: [
        {
          url: `${baseUrl}${blog.image}`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content.substring(0, 160),
      images: [`${baseUrl}${blog.image}`],
    },
  };
}

/* =========================
   Page Component
========================= */
export default async function Page({ params }: any) {
  const blogId = Number((await params).id);
  console.log(blogId);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return <h1 className="text-center text-3xl py-20">Blog Not Found</h1>;
  }

  return <BlogDetailsPage blog={blog} />;
}

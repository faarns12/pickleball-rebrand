/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { getBlogById } from "@/lib/blogs";
import BlogDetailsPage from "./index";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const baseUrl = "https://www.pickleballbangladesh.com";
  const blogId = Number((await params).id);
  const blog = await getBlogById(blogId);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog you are looking for does not exist.",
    };
  }

  const description = stripHtml(blog.excerpt || blog.content).substring(0, 160);
  const imageUrl = blog.image.startsWith("http") ? blog.image : `${baseUrl}${blog.image}`;

  return {
    title: blog.title,
    description,
    openGraph: {
      title: blog.title,
      description,
      url: `${baseUrl}/blog/${blog.id}`,
      siteName: "Pickleball Bangladesh",
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function Page({ params }: any) {
  const blogId = Number((await params).id);
  const blog = await getBlogById(blogId);

  if (!blog) {
    return <h1 className="text-center text-3xl py-20">Blog Not Found</h1>;
  }

  return <BlogDetailsPage blog={blog} />;
}

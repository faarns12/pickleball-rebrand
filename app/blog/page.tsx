import { getActiveBlogs } from '@/lib/blogs';
import BlogList from './BlogList';

export default async function BlogPage() {
  const blogs = await getActiveBlogs();
  return <BlogList blogs={blogs} />;
}

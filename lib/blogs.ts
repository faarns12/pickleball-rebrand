/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabase';
import { Blog } from '@/types/blog';

function mapRow(row: any): Blog {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image || '/blog11.jpg',
    category: row.category || 'Sports',
    date: row.date,
    author: row.author || 'Pickleball',
    readingTime: row.reading_time || '5 min read',
    tags: row.tags || [],
    authorAvatar: row.author_avatar,
    authorBio: row.author_bio,
    is_active: row.is_active,
  };
}

export async function getActiveBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return (data || []).map(mapRow);
}

export async function getBlogById(id: number): Promise<Blog | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

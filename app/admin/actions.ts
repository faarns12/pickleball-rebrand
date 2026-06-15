'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function createBlog(formData: FormData) {
  const supabase = getAdminClient();

  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string) || generateSlug(title);
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const image = (formData.get('image') as string) || '/blog11.jpg';
  const category = formData.get('category') as string;
  const date = formData.get('date') as string;
  const author = (formData.get('author') as string) || 'Pickleball';
  const reading_time = (formData.get('reading_time') as string) || '5 min read';
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const is_active = formData.get('is_active') === 'true';

  const { error } = await supabase.from('blogs').insert({
    title, slug, excerpt, content, image, category, date, author, reading_time, tags, is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function updateBlog(id: number, formData: FormData) {
  const supabase = getAdminClient();

  const title = formData.get('title') as string;
  const slug = (formData.get('slug') as string) || generateSlug(title);
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const image = (formData.get('image') as string) || '/blog11.jpg';
  const category = formData.get('category') as string;
  const date = formData.get('date') as string;
  const author = (formData.get('author') as string) || 'Pickleball';
  const reading_time = (formData.get('reading_time') as string) || '5 min read';
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
  const is_active = formData.get('is_active') === 'true';

  const { error } = await supabase.from('blogs').update({
    title, slug, excerpt, content, image, category, date, author, reading_time, tags, is_active, updated_at: new Date().toISOString(),
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function deleteBlog(id: number) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
}

export async function toggleBlogStatus(id: number, is_active: boolean) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('blogs')
    .update({ is_active, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
}

export async function getAllBlogsAdmin(): Promise<any[]> {
  const supabase = getAdminClient();
  
  // Debug logging
  console.log('[getAllBlogsAdmin] Starting query...');
  console.log('[getAllBlogsAdmin] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('[getAllBlogsAdmin] Has service role key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('[getAllBlogsAdmin] Query error:', {
      message: error.message,
      code: (error as any).code,
      status: (error as any).status,
      details: (error as any).details,
    });
    throw new Error(error.message);
  }
  
  return data || [];
}

export async function getBlogByIdAdmin(id: number): Promise<any | null> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}

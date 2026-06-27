'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createFoodMenuItem(formData: FormData) {
  const supabase = getAdminClient();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const category = formData.get('category') as string;
  const image = (formData.get('image') as string) || '/menu.png';
  const is_active = formData.get('is_active') === 'true';

  const { error } = await supabase.from('food_menu').insert({
    name, description, price, category, image, is_active,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin/food-menu');
  redirect('/admin/food-menu');
}

export async function updateFoodMenuItem(id: number, formData: FormData) {
  const supabase = getAdminClient();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const category = formData.get('category') as string;
  const image = (formData.get('image') as string) || '/menu.png';
  const is_active = formData.get('is_active') === 'true';

  const { error } = await supabase.from('food_menu').update({
    name, description, price, category, image, is_active,
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin/food-menu');
  redirect('/admin/food-menu');
}

export async function deleteFoodMenuItem(id: number) {
  const supabase = getAdminClient();
  const { error } = await supabase.from('food_menu').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/food-menu');
}

export async function toggleFoodMenuItemStatus(id: number, is_active: boolean) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('food_menu')
    .update({ is_active })
    .eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/food-menu');
}

export async function getAllFoodMenuAdmin(): Promise<any[]> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('food_menu')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function getFoodMenuItemByIdAdmin(id: number): Promise<any | null> {
  const supabase = getAdminClient();
  const { data, error } = await supabase.from('food_menu').select('*').eq('id', id).single();
  if (error || !data) return null;
  return data;
}


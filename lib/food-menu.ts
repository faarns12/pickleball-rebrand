import { getAdminClient } from '@/lib/supabase-server';

export async function getActiveFoodMenu() {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from('food_menu')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

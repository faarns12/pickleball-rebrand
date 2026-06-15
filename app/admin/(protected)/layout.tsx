import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from './AdminSidebar';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session?.value !== process.env.ADMIN_TOKEN) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

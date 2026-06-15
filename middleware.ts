import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = process.env.ADMIN_TOKEN;
  const sessionCookie = request.cookies.get('admin_session');
  const isAuthenticated = sessionCookie?.value === adminToken;

  // Protect all admin routes except the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Redirect authenticated users away from login
  if (pathname === '/admin' && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};

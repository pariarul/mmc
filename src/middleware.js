import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // 1. Protected Admin routes
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = request.cookies.get('admin_session')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // Simple edge-safe check (validates structure and expiration)
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error();
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role !== 'admin' || (payload.exp * 1000) < Date.now()) {
        throw new Error();
      }
    } catch (err) {
      // Cookie is invalid or expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // 2. Protected Doctor secure profile dossier
  if (path.startsWith('/doctor-profile/')) {
    const token = request.cookies.get('doctor_session')?.value;
    const pathParts = path.split('/');
    const docId = pathParts[pathParts.length - 1];

    if (!token) {
      return NextResponse.redirect(new URL('/verify-doctor?error=session_required', request.url));
    }

    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error();
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      
      // Doctor can only access their OWN profile, unless an admin is viewing it
      const isAdmin = request.cookies.get('admin_session')?.value;
      if (!isAdmin && (payload.doctorId !== docId || (payload.exp * 1000) < Date.now())) {
        throw new Error();
      }
    } catch (err) {
      const response = NextResponse.redirect(new URL('/verify-doctor?error=session_invalid', request.url));
      response.cookies.delete('doctor_session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/doctor-profile/:path*'],
};

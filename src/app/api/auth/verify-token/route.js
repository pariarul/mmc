import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(request) {
  try {
    const adminSessionToken = request.cookies.get('admin_session')?.value;

    if (!adminSessionToken) {
      return NextResponse.json(
        { authenticated: false, error: 'No active admin session found.' },
        { status: 401 }
      );
    }

    const payload = verifyToken(adminSessionToken);

    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { authenticated: false, error: 'Session is invalid or has expired.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error('Error verifying token in API:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

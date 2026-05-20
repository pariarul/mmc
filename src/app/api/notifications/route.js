import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/jwt';

function authenticateAdmin(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

export async function GET() {
  try {
    const { data: notifications, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return NextResponse.json({ error: 'Failed to fetch notifications.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error('Error in notifications GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 });
    }

    const { data: notification, error } = await supabaseAdmin
      .from('notifications')
      .insert({ title, description })
      .select()
      .single();

    if (error) {
      console.error('Error inserting notification:', error);
      return NextResponse.json({ error: 'Failed to create notification.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, notification }, { status: 201 });
  } catch (error) {
    console.error('Error in notifications POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Notification ID is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('notifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting notification:', error);
      return NextResponse.json({ error: 'Failed to delete notification.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Notification deleted successfully.' });
  } catch (error) {
    console.error('Error in notifications DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

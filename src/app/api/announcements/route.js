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
    const { data: announcements, error } = await supabaseAdmin
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching announcements:', error);
      return NextResponse.json({ error: 'Failed to fetch announcements.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, announcements });
  } catch (error) {
    console.error('Error in announcements GET:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const { title, file_url } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Announcement title is required.' }, { status: 400 });
    }

    const { data: announcement, error } = await supabaseAdmin
      .from('announcements')
      .insert({ 
        title, 
        file_url: file_url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' 
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting announcement:', error);
      return NextResponse.json({ error: 'Failed to create announcement.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, announcement }, { status: 201 });
  } catch (error) {
    console.error('Error in announcements POST:', error);
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
      return NextResponse.json({ error: 'Announcement ID is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      return NextResponse.json({ error: 'Failed to delete announcement.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Announcement deleted successfully.' });
  } catch (error) {
    console.error('Error in announcements DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

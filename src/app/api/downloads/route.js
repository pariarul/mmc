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
    const { data: downloads, error } = await supabaseAdmin
      .from('downloads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching downloads:', error);
      return NextResponse.json({ error: 'Failed to fetch downloads.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, downloads });
  } catch (error) {
    console.error('Error in downloads GET:', error);
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
      return NextResponse.json({ error: 'Download title is required.' }, { status: 400 });
    }

    const { data: download, error } = await supabaseAdmin
      .from('downloads')
      .insert({ 
        title, 
        file_url: file_url || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting download:', error);
      return NextResponse.json({ error: 'Failed to create download.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, download }, { status: 201 });
  } catch (error) {
    console.error('Error in downloads POST:', error);
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
      return NextResponse.json({ error: 'Download ID is required.' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('downloads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting download:', error);
      return NextResponse.json({ error: 'Failed to delete download.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Download deleted successfully.' });
  } catch (error) {
    console.error('Error in downloads DELETE:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

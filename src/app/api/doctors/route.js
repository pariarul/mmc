import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/jwt';

// Helper to authenticate admin
function authenticateAdmin(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

export async function GET(request) {
  try {
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabaseAdmin
      .from('doctors')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (search) {
      // Postgres search filter on name, registration number, or sr_no
      query = query.or(`doctor_name.ilike.%${search}%,register_no.ilike.%${search}%,sr_no.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data: doctors, count, error } = await query.range(from, to);

    if (error) {
      console.error('Error fetching doctors:', error);
      return NextResponse.json({ error: 'Failed to fetch doctor database.' }, { status: 500 });
    }

    return NextResponse.json({
      doctors,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error in doctors GET API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = authenticateAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized administrative access.' }, { status: 401 });
    }

    const body = await request.json();
    const {
      doctor_name,
      father_name,
      dob,
      sr_no,
      qualification,
      register_no,
      address,
      date_of_issue,
      valid_upto,
      doctor_image,
      email,
    } = body;

    // Simple backend form validation
    if (
      !doctor_name ||
      !father_name ||
      !dob ||
      !sr_no ||
      !qualification ||
      !register_no ||
      !address ||
      !date_of_issue ||
      !valid_upto ||
      !email
    ) {
      return NextResponse.json({ error: 'All fields are mandatory except Doctor Image.' }, { status: 400 });
    }

    // Check if registration number already exists
    const { data: existingReg } = await supabaseAdmin
      .from('doctors')
      .select('id')
      .eq('register_no', register_no)
      .maybeSingle();

    if (existingReg) {
      return NextResponse.json({ error: 'A doctor with this Registration Number already exists.' }, { status: 409 });
    }

    // Check if email already exists
    const { data: existingEmail } = await supabaseAdmin
      .from('doctors')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingEmail) {
      return NextResponse.json({ error: 'A doctor with this Email already exists.' }, { status: 409 });
    }

    // Insert new doctor profile
    const { data: newDoctor, error } = await supabaseAdmin
      .from('doctors')
      .insert({
        doctor_name,
        father_name,
        dob,
        sr_no,
        qualification,
        register_no,
        address,
        date_of_issue,
        valid_upto,
        doctor_image: doctor_image || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=300&q=80', // professional generic placeholder
        email: email.toLowerCase().trim(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting doctor:', error);
      return NextResponse.json({ error: 'Failed to save doctor to database.' }, { status: 500 });
    }

    // Log administrative action
    await supabaseAdmin.from('activity_logs').insert({
      action: `Created doctor profile: ${doctor_name} (${register_no})`,
      user_id: admin.id,
    });

    return NextResponse.json({ success: true, doctor: newDoctor }, { status: 201 });
  } catch (error) {
    console.error('Error in doctors POST API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/jwt';

// Authentication helper
function checkAuthorization(request, doctorId) {
  // 1. Check if they are an active admin
  const adminToken = request.cookies.get('admin_session')?.value;
  if (adminToken) {
    const adminPayload = verifyToken(adminToken);
    if (adminPayload && adminPayload.role === 'admin') {
      return { authorized: true, role: 'admin', user: adminPayload };
    }
  }

  // 2. Check if they are the specific verified doctor
  const doctorToken = request.cookies.get('doctor_session')?.value;
  if (doctorToken) {
    const doctorPayload = verifyToken(doctorToken);
    if (doctorPayload && doctorPayload.doctorId === doctorId) {
      return { authorized: true, role: 'doctor', user: doctorPayload };
    }
  }

  return { authorized: false };
}

export async function GET(request, { params }) {
  try {
    // Await params as required by Next.js 15
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const auth = checkAuthorization(request, id);
    if (!auth.authorized) {
      return NextResponse.json(
        { error: 'Access denied. You must verify OTP to securely view this profile.' },
        { status: 403 }
      );
    }

    // Fetch doctor profile
    const { data: doctor, error } = await supabaseAdmin
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !doctor) {
      return NextResponse.json({ error: 'Doctor profile not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, doctor });
  } catch (error) {
    console.error('Error in doctor GET by ID API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Admin only
    const adminToken = request.cookies.get('admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const adminPayload = verifyToken(adminToken);
    if (!adminPayload || adminPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
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

    // Check if another doctor already uses register_no or email
    const { data: duplicateCheck } = await supabaseAdmin
      .from('doctors')
      .select('id, register_no, email')
      .or(`register_no.eq.${register_no},email.eq.${email}`)
      .neq('id', id);

    if (duplicateCheck && duplicateCheck.length > 0) {
      const hasDuplicateReg = duplicateCheck.some(d => d.register_no === register_no);
      const hasDuplicateEmail = duplicateCheck.some(d => d.email === email);
      if (hasDuplicateReg) {
        return NextResponse.json({ error: 'Another doctor with this Registration Number already exists.' }, { status: 409 });
      }
      if (hasDuplicateEmail) {
        return NextResponse.json({ error: 'Another doctor with this Email already exists.' }, { status: 409 });
      }
    }

    const { data: updatedDoctor, error } = await supabaseAdmin
      .from('doctors')
      .update({
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
        email: email.toLowerCase().trim(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating doctor profile:', error);
      return NextResponse.json({ error: 'Failed to update doctor profile.' }, { status: 500 });
    }

    // Log admin action
    await supabaseAdmin.from('activity_logs').insert({
      action: `Updated doctor profile: ${doctor_name} (${register_no})`,
      user_id: adminPayload.id,
    });

    return NextResponse.json({ success: true, doctor: updatedDoctor });
  } catch (error) {
    console.error('Error in doctor PUT API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // Admin only
    const adminToken = request.cookies.get('admin_session')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }
    const adminPayload = verifyToken(adminToken);
    if (!adminPayload || adminPayload.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized admin access.' }, { status: 401 });
    }

    // Fetch doctor name for logging
    const { data: doctor } = await supabaseAdmin
      .from('doctors')
      .select('doctor_name, register_no')
      .eq('id', id)
      .single();

    const { error } = await supabaseAdmin
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting doctor profile:', error);
      return NextResponse.json({ error: 'Failed to delete doctor profile.' }, { status: 500 });
    }

    // Log admin action
    if (doctor) {
      await supabaseAdmin.from('activity_logs').insert({
        action: `Deleted doctor profile: ${doctor.doctor_name} (${doctor.register_no})`,
        user_id: adminPayload.id,
      });
    }

    return NextResponse.json({ success: true, message: 'Doctor profile deleted successfully.' });
  } catch (error) {
    console.error('Error in doctor DELETE API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

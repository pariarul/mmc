import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { signToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP verification code are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    // 1. Query the latest OTP verification for this email
    const { data: record, error } = await supabaseAdmin
      .from('otp_verifications')
      .select('*')
      .eq('email', cleanEmail)
      .eq('otp', cleanOtp)
      .eq('verified', false)
      .maybeSingle();

    if (error) {
      console.error('Error querying OTP:', error);
      return NextResponse.json({ error: 'Database verification failed.' }, { status: 500 });
    }

    if (!record) {
      return NextResponse.json(
        { error: 'Invalid or incorrect OTP. Please try again.' },
        { status: 400 }
      );
    }

    // 2. Check if the OTP is expired (5 mins threshold)
    const expiresAt = new Date(record.expires_at).getTime();
    if (expiresAt < Date.now()) {
      return NextResponse.json(
        { error: 'Verification OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // 3. Mark the OTP as verified in the database
    await supabaseAdmin
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', record.id);

    // 4. Retrieve the matching doctor profile
    const { data: doctor, error: doctorError } = await supabaseAdmin
      .from('doctors')
      .select('*')
      .eq('email', cleanEmail)
      .single();

    if (doctorError || !doctor) {
      return NextResponse.json(
        { error: 'Doctor record could not be found.' },
        { status: 404 }
      );
    }

    // 5. Generate secure Doctor JWT Session
    const token = signToken(
      { doctorId: doctor.id, email: doctor.email, registerNo: doctor.register_no },
      '1h' // Valid for 1 hour to print/download certificate
    );

    // 6. Set doctor_session cookie and return response
    const response = NextResponse.json({
      success: true,
      doctorId: doctor.id,
      message: 'OTP verified successfully.',
    });

    response.cookies.set({
      name: 'doctor_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in otp-verify API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

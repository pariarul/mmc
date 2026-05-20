import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendOtpEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const { identifier } = await request.json(); // can be email OR register_no

    if (!identifier) {
      return NextResponse.json(
        { error: 'Please enter your registered Email or Registration Number.' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim();

    // 1. Query the doctor by email or registration number
    let query = supabaseAdmin.from('doctors').select('*');
    if (cleanIdentifier.includes('@')) {
      query = query.eq('email', cleanIdentifier);
    } else {
      query = query.eq('register_no', cleanIdentifier);
    }

    const { data: doctor, error } = await query.maybeSingle();

    if (error) {
      console.error('Error fetching doctor:', error);
      return NextResponse.json({ error: 'Database query failed.' }, { status: 500 });
    }

    if (!doctor) {
      return NextResponse.json(
        { error: 'No doctor registered under this Email or Registration Number.' },
        { status: 404 }
      );
    }

    // 2. Generate a secure 6-digit OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes expiry

    // 3. Save the OTP in the otp_verifications database table
    // Delete older active OTPs for this email to avoid clutter
    await supabaseAdmin
      .from('otp_verifications')
      .delete()
      .eq('email', doctor.email);

    const { error: insertError } = await supabaseAdmin
      .from('otp_verifications')
      .insert({
        email: doctor.email,
        otp: otp,
        expires_at: expiresAt,
        verified: false,
      });

    if (insertError) {
      console.error('Error inserting OTP verification:', insertError);
      return NextResponse.json({ error: 'Failed to generate verification code.' }, { status: 500 });
    }

    // 4. Send the OTP email using our service
    const emailSent = await sendOtpEmail(doctor.email, otp, doctor.doctor_name);

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send OTP verification email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      email: doctor.email,
      message: `OTP sent successfully to registered email. Valid for 5 minutes.`,
    });
  } catch (error) {
    console.error('Error in otp-send API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

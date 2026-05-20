import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { signToken } from '@/lib/jwt';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@mmc.gov.in';
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'admin123';

    // 1. Check if the login matches the static Super Admin credentials
    if (email === superAdminEmail && password === superAdminPassword) {
      const token = signToken(
        { id: 'super-admin-id', email: superAdminEmail, role: 'admin' },
        '8h'
      );

      try {
        await supabaseAdmin.from('activity_logs').insert({
          action_details: `Super Admin logged in successfully: ${superAdminEmail}`,
          admin_email: superAdminEmail,
        });
      } catch (err) {
        console.log('Skipped activity log insert.');
      }

      const response = NextResponse.json({
        success: true,
        admin: { id: 'super-admin-id', email: superAdminEmail, role: 'admin' },
      });

      response.cookies.set({
        name: 'admin_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      return response;
    }

    // 2. Fallback: Query the Supabase admins table
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      try {
        await supabaseAdmin.from('activity_logs').insert({
          action_details: `Failed login attempt for email: ${email}`,
          admin_email: email
        });
      } catch (err) {}

      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Generate a secure admin JWT token
    const token = signToken(
      { id: admin.id, email: admin.email, role: admin.role },
      '8h' // Admin session expires in 8 hours
    );

    // 4. Log successful login
    await supabaseAdmin.from('activity_logs').insert({
      action: `Admin logged in successfully: ${email}`,
      user_id: admin.id
    });

    // 5. Create secure cookies and send response
    const response = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });

    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error in admin-login API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

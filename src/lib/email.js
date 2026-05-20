import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = parseInt(process.env.SMTP_PORT || '587');
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

export async function sendOtpEmail(email, otp) {
  // Check if SMTP environment variables are configured
  if (!host || !user || !pass) {
    console.log('\n┌────────────────────────────────────────────────────────┐');
    console.log('│                    [DEVELOPMENT OTP LOG]               │');
    console.log(`│  Recipient:  ${email.padEnd(42)}│`);
    console.log(`│  OTP Code:   ${otp.padEnd(42)}│`);
    console.log('│  Notice:     Config SMTP variables in .env to dispatch │');
    console.log('│              real emails via Nodemailer.               │');
    console.log('└────────────────────────────────────────────────────────┘\n');
    return { success: true, logged: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });

  const mailOptions = {
    from: '"Maharashtra Medical Council" <noreply@mmc.gov.in>',
    to: email,
    subject: 'Secure OTP for Practitioner Registration Verification',
    html: `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #14253D;">MAHARASHTRA MEDICAL COUNCIL</h2>
        <p>Dear Practitioner,</p>
        <p>We received a request to verify your medical credentials and access your secure registration profile.</p>
        <div style="background-color: #f4f6f9; border: 1px solid #cbd8e6; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #14253D;">${otp}</span>
        </div>
        <p>This verification OTP code is strictly valid for <strong>5 minutes</strong>. If you did not make this request, please disregard this email or contact support.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
        <p style="font-size: 11px; color: #666;">This is an automated system notification. Please do not reply directly to this mail.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

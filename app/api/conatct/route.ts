import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { fullName, phoneNumber, service, message } = await request.json();

    // Configure transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content configuration
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends the message to your own Gmail
      subject: `New Contact Form Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #6366f1;">New Contact Submission</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Selected Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f8fafc; padding: 12px; border-radius: 6px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email.' }, { status: 500 });
  }
}
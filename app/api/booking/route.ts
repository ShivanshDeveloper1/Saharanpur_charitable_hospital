
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, phone, date, service, message } = body;

    // Validate the submitted data on the server
    if (
      typeof fullName !== 'string' ||
      typeof phone !== 'string' ||
      typeof date !== 'string' ||
      typeof service !== 'string' ||
      typeof message !== 'string' ||
      !fullName.trim() ||
      !phone.trim() ||
      !date ||
      !service.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    if (
      fullName.length > 100 ||
      phone.length > 20 ||
      service.length > 100 ||
      message.length > 2000 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^[+()\d\s-]{7,20}$/.test(phone)
    ) {
      return NextResponse.json(
        { success: false, message: 'Please check your submitted details.' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error('Booking email environment variables are missing.');

      return NextResponse.json(
        { success: false, message: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const safeName = escapeHtml(fullName.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeDate = escapeHtml(date);
    const safeService = escapeHtml(service.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      subject: `New Appointment Request - ${fullName.trim()}`,
      text: [
        'New appointment request',
        `Patient Name: ${fullName.trim()}`,
        `Phone: ${phone.trim()}`,
        `Preferred Date: ${date}`,
        `Service: ${service.trim()}`,
        `Message: ${message.trim()}`,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Appointment Request</h2>
          <p><strong>Patient Name:</strong> ${safeName}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Preferred Date:</strong> ${safeDate}</p>
          <p><strong>Service:</strong> ${safeService}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
          <hr />
          <p>Please contact the patient to confirm the appointment.</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request sent successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking email failed:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to submit your request. Please try again.',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { userEmail, subject, message } = body;

    // Validate required fields
    if (!userEmail || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '2525', 10),
      secure: false, // Use true if using port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: `"Cremacion directa proveedor" <${process.env.EMAIL_USER}>`, // Sender email
      to: process.env.EMAIL_DEFAULT, // Receiver email
      subject: `Proveedor CremacionDirecta: ${subject}`,
      text: `From: ${userEmail}\n\n${message}`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);

    // Respond with a generic error message
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

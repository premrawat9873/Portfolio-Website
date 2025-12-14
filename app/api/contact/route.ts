import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import type { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function GET() {
  // Respond quickly without performing network calls to avoid client aborts
  return NextResponse.json({ ok: true, message: 'Contact API is healthy. Use POST to submit.' });
}

// Handle contact form submissions via POST to avoid client aborts (ECONNRESET)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, message: 'Unsupported content type. Use application/json.' },
        { status: 415 }
      );
    }

    type ContactPayload = { name?: string; email?: string; message?: string };
    const { name, email, message }: ContactPayload = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Fire-and-forget to avoid keeping the request open (prevents ECONNRESET on client abort)
    void resend.emails.send({
      from: 'no-reply@prem-rawat.me',
      to: 'premrawat.dev@gmail.com',
      subject: `New contact form submission from ${name}`,
      text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
      reply_to: email,
    }).then((result) => {
      console.log('Contact email queued/sent:', result);
    }).catch((err: any) => {
      console.error('Resend contact send error:', {
        message: err?.message,
        name: err?.name,
        code: err?.code,
        stack: err?.stack
      });
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    });
  } catch (err: unknown) {
    const error = err as { message?: string; name?: string; code?: string; stack?: string };
    console.error('Contact POST error:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      stack: error?.stack,
    });

    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}

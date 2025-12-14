import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function GET() {
  try {
    // Fire-and-forget to avoid keeping the request open
    void resend.emails.send({
      from: 'no-reply@prem-rawat.me',
      to: 'premrawat.dev@gmail.com',
      subject: 'TEST EMAIL',
      text: 'This is a test.',
    }).then((result) => {
      console.log('Test email queued/sent:', result);
    }).catch((err: any) => {
      console.error('Resend test-email send error:', {
        message: err?.message,
        name: err?.name,
        code: err?.code,
        stack: err?.stack
      });
    });

    return NextResponse.json({ ok: true, message: 'Queued test email.' });
  } catch (err: any) {
    console.error('Resend error:', {
      message: err.message,
      name: err.name,
      code: err.code,
      stack: err.stack
    });
    
    return NextResponse.json(
      {
        ok: false,
        message: err.message,
        name: err.name,
        code: err.code,
        details: err,
      },
      { status: 500 }
    );
  }
}

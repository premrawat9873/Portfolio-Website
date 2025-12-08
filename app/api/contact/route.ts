import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: 'no-reply@prem-rawat.me',
      to: 'premrawat.dev@gmail.com',
      subject: 'TEST EMAIL',
      text: 'This is a test.',
    });

    console.log('Test email sent successfully:', result);
    return NextResponse.json({ ok: true, result });
    
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

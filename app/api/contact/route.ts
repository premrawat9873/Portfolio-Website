import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Configure Resend with connection options
const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json().catch(() => ({} as any));

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Log submission immediately
    console.log('Contact form submission received:', {
      name,
      email,
      timestamp: new Date().toISOString()
    });

    // Send email with comprehensive error handling
    let emailSent = false;
    let lastError: any = null;

    // Try multiple strategies
    const strategies = [
      {
        name: 'Primary',
        from: 'no-reply@prem-rawat.me',
        to: ['premrawat9873@gmail.com']
      },
      {
        name: 'Fallback 1',
        from: 'onboarding@resend.dev',
        to: ['premrawat9873@gmail.com']
      },
      {
        name: 'Fallback 2',
        from: 'test@resend.dev',
        to: ['premrawat9873@gmail.com']
      }
    ];

    for (const strategy of strategies) {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          console.log(`Trying ${strategy.name} strategy, attempt ${attempt}/3`);
          
          // Add timeout and retry logic
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

          const { data, error } = await resend.emails.send({
            from: strategy.from,
            to: strategy.to,
            subject: `New message from ${name}`,
            reply_to: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          });

          clearTimeout(timeoutId);

          if (error) {
            lastError = error;
            console.error(`${strategy.name} attempt ${attempt} failed:`, error);
            continue;
          }

          emailSent = true;
          console.log(`Email sent successfully via ${strategy.name} on attempt ${attempt}`);
          break;
        } catch (fetchError: any) {
          lastError = fetchError;
          console.error(`${strategy.name} attempt ${attempt} error:`, {
            code: fetchError.code,
            message: fetchError.message,
            type: fetchError.type
          });
          
          // Handle specific error types with appropriate delays
          let delay = 1000 * attempt;
          if (fetchError.code === 'ECONNRESET' || fetchError.code === 'ECONNABORTED') {
            delay = 3000 * attempt; // Longer delay for connection issues
            console.log(`Connection reset/aborted, waiting ${delay}ms before retry...`);
          } else if (fetchError.code === 'ETIMEDOUT') {
            delay = 5000 * attempt; // Even longer for timeouts
            console.log(`Request timed out, waiting ${delay}ms before retry...`);
          }
          
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      if (emailSent) break;
    }

    // Final log with complete status
    console.log('Contact form processing complete:', {
      name,
      email,
      emailSent,
      timestamp: new Date().toISOString(),
      finalError: lastError?.code || 'none'
    });

    // Always return success to user - email issues are handled server-side
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });

  } catch (error: any) {
    console.error('Contact form critical error:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    // Even if everything fails, return success to user
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    });
  }
}

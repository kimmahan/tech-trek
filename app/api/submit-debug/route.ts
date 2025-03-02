import { NextResponse } from 'next/server';
import { submitToAirtable } from '@/app/api/debug-detective/service';

export async function POST(request: Request) {
  if (!process.env.AIRTABLE_API_KEY) {
    console.error('AIRTABLE_API_KEY is not defined');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const submission = await request.json();
    console.log('Attempting submission:', submission); // Debug log
    
    await submitToAirtable(submission);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to submit'
    }, { status: 500 });
  }
} 
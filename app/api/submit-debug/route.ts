import { NextResponse } from 'next/server';
import { submitToAirtable } from '@/app/api/debug-detective/service';

export async function POST(request: Request) {
  try {
    const submission = await request.json();
    const result = await submitToAirtable(submission);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
} 
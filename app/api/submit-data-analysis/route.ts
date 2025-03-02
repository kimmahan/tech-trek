// app/api/submit-data-analysis/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { submitToAirtable } from '@/app/api/service';
import type { DataAnalysisSubmission } from '@/app/challenges/data-science/types';

export async function POST(request: NextRequest) {
  try {
    const submission: DataAnalysisSubmission = await request.json();
    
    // Validation
    if (!submission.solution || submission.solution.trim().length < 50) {
      return NextResponse.json(
        { error: 'Please provide a detailed analysis (minimum 50 characters)' },
        { status: 400 }
      );
    }
    
    // Submit to Airtable
    const result = await submitToAirtable(submission);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Data Analysis Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit analysis' },
      { status: 500 }
    );
  }
}
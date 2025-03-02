import Airtable from 'airtable';
import type { DebugSubmission } from '@/app/challenges/debug-detective/types';

export const submitToAirtable = async (submission: DebugSubmission) => {
  try {
    console.log("ENV variables:", {
      AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
      AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
    });

    // Configure Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID || 'appkCpEKCNy1UCqoj');

    console.log('Attempting submission with Airtable library');
    console.log('Request body:', JSON.stringify(submission, null, 2));
    
    // Create a record in the table
    const result = await base('Debug Challenge Submissions').create([
      {
        fields: {
          solution: submission.solution,
          usedHint: submission.usedHint,
          timeSpent: submission.timeSpent,
          track: submission.track,
          challengeId: submission.challengeId,
          timestamp: submission.timestamp
        }
      }
    ]);

    console.log('Airtable response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
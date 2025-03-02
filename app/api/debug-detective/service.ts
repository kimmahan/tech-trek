// Modify your service.ts file
import Airtable from 'airtable';
import type { DebugSubmission } from '@/app/challenges/debug-detective/types';
import type { DataAnalysisSubmission } from '@/app/challenges/data-science/types';

// Generic type for all challenge submissions
type ChallengeSubmission = DebugSubmission | DataAnalysisSubmission;

export const submitToAirtable = async (submission: ChallengeSubmission) => {
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

    // Format the submission data for Airtable
    const formattedSubmission = {
      solution: submission.solution,
      usedHint: submission.usedHint,
      timeSpent: submission.timeSpent,
      track: submission.track,
      challengeId: submission.challengeId,
      // Convert ISO string to Date object for Airtable
      // timestamp: new Date(submission.timestamp)
    };

    console.log('Request body:', JSON.stringify(formattedSubmission, null, 2));

    // Determine which table to use based on the challenge type
    let tableName = 'Challenge Submissions';
    
    if (submission.challengeId.includes('debug')) {
      tableName = 'Debug Challenge Submissions';
    } else if (submission.challengeId.includes('data-analysis')) {
      tableName = 'Data Analysis Submissions';
    }

    // Create a record in the table
    const result = await base(tableName).create([
      {
        fields: formattedSubmission
      }
    ]);

    console.log('Airtable response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
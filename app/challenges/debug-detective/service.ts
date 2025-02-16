// service.ts
import { DebugSubmission } from './types';

interface AirtableError {
  error?: {
    message?: string;
    type?: string;
  };
}
console.log("ENV variables:", {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
});

export const debugChallengeService = {
  async submitSolution(submission: DebugSubmission) {
    const response = await fetch('/api/submit-debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error('Failed to submit solution');
    }

    return response.json();
  }
};
// service.ts
import { DebugSubmission } from './types';

interface AirtableError {
  error?: {
    message?: string;
    type?: string;
  };
}

class DebugChallengeService {
  private readonly AIRTABLE_API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
  private readonly AIRTABLE_BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
  private readonly TABLE_ID = 'tblIJ2xkrajMlTpUo';

  async submitSolution(submission: DebugSubmission): Promise<void> {
    console.log('Starting submission with config:', {
      hasKey: !!this.AIRTABLE_API_KEY,
      keyLength: this.AIRTABLE_API_KEY?.length,
      baseId: this.AIRTABLE_BASE_ID,
      tableId: this.TABLE_ID
    });

    const url = `https://api.airtable.com/v0/${this.AIRTABLE_BASE_ID}/${this.TABLE_ID}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              solution: submission.solution,
              usedHint: submission.usedHint,
              timeSpent: submission.timeSpent,
              timestamp: new Date().toISOString(),
              track: submission.track,
              challengeId: submission.challengeId
            }
          }]
        })
      });

      console.log('POST response:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText
      });

      const responseData: AirtableError = await response.json();
      console.log('POST response data:', responseData);

      if (!response.ok) {
        const errorMessage = responseData.error?.message || 'Unknown error occurred';
        console.error('Submission failed:', {
          status: response.status,
          message: errorMessage,
          data: responseData
        });
        throw new Error(`Airtable API error: ${response.status} - ${errorMessage}`);
      }

    } catch (err) {
      const error = err as Error;
      console.error('Request failed:', {
        message: error.message,
        url: url
      });
      throw error;
    }
  }
}

export const debugChallengeService = new DebugChallengeService();
import type { DebugSubmission } from '@/app/challenges/debug-detective/types';

// Server-side only code
export const submitToAirtable = async (submission: DebugSubmission) => {
  const response = await fetch('https://api.airtable.com/v0/appKCptKCNy1UCqp3/tblL12zkKrg3MtTplo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
    body: JSON.stringify({
      records: [{
        fields: submission
      }]
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit to Airtable');
  }

  return response.json();
}; 
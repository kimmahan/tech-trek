// service.ts
import type { DebugSubmission } from '@/app/challenges/debug-detective/types';

console.log("ENV variables:", {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
});

export const submitToAirtable = async (submission: DebugSubmission) => {
  try {
    const url = 'https://api.airtable.com/v0/appKCptKCNy1UCqp3/tblL12zkKrg3MtTplo';
    console.log('Submitting to:', url);
    
    const requestBody = {
      records: [{
        fields: submission
      }]
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    console.log('API Key present:', !!process.env.AIRTABLE_API_KEY);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} - ${responseText}`);
    }

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};
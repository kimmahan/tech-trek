'use client';
// app/challenges/data-science/DataAnalysisChallenge.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// Remove unused imports or comment them out for future use
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   Legend, 
//   ResponsiveContainer 
// } from 'recharts';

interface DataPoint {
  month: string;
  sales: number;
  customers: number;
}

export default function DataAnalysisChallenge() {
  const [solution, setSolution] = useState('');
  // Keep track of these state variables for future implementation
  const [startTime, setStartTime] = useState(0);
  
  // Comment out all unused state variables including usedHint
  // const [usedHint, setUsedHint] = useState(false);
  // const [timeSpent, setTimeSpent] = useState(0);
  // const [showHint, setShowHint] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState('');

  // Mock dataset for the challenge
  const dataset: DataPoint[] = [
    { month: 'Jan', sales: 12000, customers: 156 },
    { month: 'Feb', sales: 18000, customers: 192 },
    { month: 'Mar', sales: 25000, customers: 231 },
    { month: 'Apr', sales: 17000, customers: 175 },
    { month: 'May', sales: 21000, customers: 189 },
    { month: 'Jun', sales: 30000, customers: 276 },
    { month: 'Jul', sales: 38000, customers: 310 },
    { month: 'Aug', sales: 36000, customers: 301 },
    { month: 'Sep', sales: 28000, customers: 265 },
    { month: 'Oct', sales: 22000, customers: 212 },
    { month: 'Nov', sales: 27000, customers: 234 },
    { month: 'Dec', sales: 34000, customers: 287 }
  ];

  useEffect(() => {
    // Start the timer when the component mounts
    setStartTime(Date.now());
    
    // Cleanup function to calculate time spent when component unmounts
    return () => {
      // Commented out to avoid eslint warning
      // const endTime = Date.now();
      // const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
      // setTimeSpent(timeSpentInSeconds);
    };
  }, [startTime]); // Add startTime to dependency array to fix exhaustive-deps warning

  // Comment out unused handlers
  /*
  const handleShowHint = () => {
    setUsedHint(true);
    setShowHint(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    
    const endTime = Date.now();
    const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
    
    try {
      // Call your API endpoint to submit the solution
      const response = await fetch('/api/submit-data-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution,
          usedHint,
          timeSpent: timeSpentInSeconds,
          track: 'Data Science',
          challengeId: 'data-analysis-1',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit solution');
      }
      
      setSuccess(true);
    } catch (err) {
      setError('Error submitting solution. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };
  */

  // Calculate some basic statistics for display
  const totalSales = dataset.reduce((sum, point) => sum + point.sales, 0);
  const totalCustomers = dataset.reduce((sum, point) => sum + point.customers, 0);
  // Comment out unused calculation
  // const avgSalesPerCustomer = (totalSales / totalCustomers).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analysis Challenge</CardTitle>
        <CardDescription>
          Analyze the given dataset and provide insights about customer behavior.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Dataset Information</h3>
          <p>
            Total Sales: ${totalSales.toLocaleString()}<br />
            Total Customers: {totalCustomers.toLocaleString()}
          </p>
        </div>
        <Textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="Enter your analysis here..."
          className="min-h-[200px] mb-4"
        />
        <Button className="mr-2">
          Show Hint
        </Button>
        <Button>Submit Analysis</Button>
      </CardContent>
    </Card>
  );
}
'use client';
// app/challenges/data-science/DataAnalysisChallenge.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import ChallengeNavigation from '@/components/ChallengeNavigation';
import ChallengeProgressTracker from '@/components/ChallengeProgressTracker';
import { useChallenges } from '@/context/ChallengeContext';

interface DataPoint {
  month: string;
  sales: number;
  customers: number;
}

export default function DataAnalysisChallenge() {
  const toast = useToast();
  const [solution, setSolution] = useState('');
  const [hint, setHint] = useState('');
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { completeChallenge, getNextChallenge } = useChallenges();
  const trackId = 'data-science';
  const challengeId = 'data-analysis';
  
  const nextChallenge = getNextChallenge(trackId, challengeId);

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

  // Calculate some basic statistics for display
  const totalSales = dataset.reduce((sum, point) => sum + point.sales, 0);
  const totalCustomers = dataset.reduce((sum, point) => sum + point.customers, 0);
  const avgSalesPerCustomer = Math.round(totalSales / totalCustomers);

  const requestHint = () => {
    setHint("Look for seasonal patterns in the data. Consider the relationship between sales and customer count in peak months.");
    setHasUsedHint(true);
  };

  const handleSubmit = async () => {
    if (!solution.trim()) {
      toast({
        title: "Error",
        description: "Please provide a solution before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-data-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution: solution.trim(),
          usedHint: hasUsedHint,
          timeSpent: Math.floor((Date.now() - startTime) / 1000),
          track: trackId,
          challengeId: challengeId,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit solution');
      }

      toast({
        title: "Success!",
        description: "Your analysis has been submitted successfully.",
      });

      setSubmitted(true);
      completeChallenge(trackId, challengeId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit analysis. Please try again.",
        variant: "destructive",
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Data Analysis Challenge</h1>
          <p className="text-gray-600 mb-4">
            Welcome to the Data Analysis Challenge! Your task is to analyze the monthly sales and customer data
            and provide insights about patterns, seasonality, and customer behavior.
          </p>
        </div>

        <ChallengeProgressTracker trackId={trackId} currentChallengeId={challengeId} />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Monthly Sales & Customer Data</CardTitle>
            <CardDescription>
              Review the following data and analyze patterns and insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Month</th>
                    <th className="border border-gray-300 p-2">Sales ($)</th>
                    <th className="border border-gray-300 p-2">Customers</th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.map((point) => (
                    <tr key={point.month}>
                      <td className="border border-gray-300 p-2">{point.month}</td>
                      <td className="border border-gray-300 p-2">${point.sales.toLocaleString()}</td>
                      <td className="border border-gray-300 p-2">{point.customers}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-300 p-2">Totals</td>
                    <td className="border border-gray-300 p-2">${totalSales.toLocaleString()}</td>
                    <td className="border border-gray-300 p-2">{totalCustomers}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Average Sales Per Customer: ${avgSalesPerCustomer}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Analysis</CardTitle>
            <CardDescription>
              Provide your insights about the data. Consider patterns, seasonal trends, and business recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Enter your data analysis here..."
              className="min-h-[200px] mb-4"
              disabled={submitted}
            />
            <div className="flex justify-between items-center">
              <Button 
                variant="outline"
                onClick={requestHint}
                disabled={hasUsedHint || submitted}
              >
                Request Hint
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || submitted}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Analysis'}
              </Button>
            </div>
            {hint && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
                {hint}
              </div>
            )}
            {submitted && (
              <Alert className="mt-4">
                <AlertDescription>
                  Thank you for your submission! Your analysis has been recorded.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <ChallengeNavigation 
          prevPath="/" 
          nextPath={nextChallenge?.path} 
          isCompleted={submitted}
        />
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import ChallengeNavigation from '@/components/ChallengeNavigation';
import ChallengeProgressTracker from '@/components/ChallengeProgressTracker';
import { useChallenges } from '@/context/ChallengeContext';

interface DataVizSubmission {
  solution: string;
  usedHint: boolean;
  timeSpent: number;
  track: string;
  challengeId: string;
  timestamp: string;
}

export default function DataVisualizationChallenge() {
  const toast = useToast();
  const [solution, setSolution] = useState('');
  const [hint, setHint] = useState('');
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { completeChallenge, getNextChallenge } = useChallenges();
  const trackId = 'data-science';
  const challengeId = 'data-visualization';
  
  const nextChallenge = getNextChallenge(trackId, challengeId);

  const requestHint = () => {
    setHint("Consider which visualization types work best for different kinds of data relationships. Think about audience and context when determining the most effective visualization approach.");
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

    const submission: DataVizSubmission = {
      solution: solution.trim(),
      usedHint: hasUsedHint,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      track: trackId,
      challengeId: challengeId,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/submit-data-viz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to submit solution');
      }

      await response.json();
      
      toast({
        title: "Success!",
        description: "Your solution has been submitted successfully.",
      });

      setSubmitted(true);
      completeChallenge(trackId, challengeId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit solution. Please try again.",
        variant: "destructive",
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample visualization scenarios
  const scenarios = [
    {
      id: 1,
      title: "Customer Demographics",
      description: "You have customer data including age, gender, income level, and purchase history for a clothing retailer.",
      question: "What visualizations would be most effective to show the relationship between demographics and purchasing patterns?",
    },
    {
      id: 2,
      title: "Website Traffic Analysis",
      description: "You have hourly website traffic data for the past 12 months, including page views, unique visitors, bounce rate, and average session duration.",
      question: "How would you visualize this data to identify trends, patterns, and anomalies?",
    },
    {
      id: 3,
      title: "Product Performance Dashboard",
      description: "You need to create a dashboard showing the performance of 50 different products across 5 key metrics (revenue, units sold, profit margin, customer satisfaction, return rate).",
      question: "What visualization techniques would you use to make this dashboard effective for executives?",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Data Visualization Challenge</h1>
          <p className="text-gray-600 mb-4">
            This challenge tests your understanding of data visualization principles and best practices.
            Review the scenarios below and provide recommendations for the most effective visualization approaches.
          </p>
          <p className="text-gray-600 mb-4">
            For each scenario, explain which visualization types you would use and why they are appropriate for the specific data and goals.
          </p>
        </div>

        <ChallengeProgressTracker trackId={trackId} currentChallengeId={challengeId} />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Visualization Scenarios</CardTitle>
            <CardDescription>
              Consider these real-world data visualization scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scenarios.map((scenario) => (
                <div key={scenario.id} className="p-4 bg-white border rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
                  <p className="text-gray-700 mb-2">{scenario.description}</p>
                  <p className="text-gray-800 font-medium">{scenario.question}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Solution</CardTitle>
            <CardDescription>
              Provide your visualization recommendations for each scenario. Explain your reasoning and any assumptions you're making.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Enter your visualization recommendations for each scenario..."
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
                {isSubmitting ? 'Submitting...' : 'Submit Solution'}
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
                  Thank you for your submission! Your solution has been recorded.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <ChallengeNavigation 
          prevPath="/challenges/data-analysis" 
          nextPath={nextChallenge?.path} 
          isCompleted={submitted}
        />
      </div>
    </div>
  );
}
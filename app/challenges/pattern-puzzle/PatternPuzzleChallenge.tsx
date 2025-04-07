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

interface PatternSubmission {
  solution: string;
  usedHint: boolean;
  timeSpent: number;
  track: string;
  challengeId: string;
  timestamp: string;
}

const patternCode = `// Pattern 1
function findMissing(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

// Pattern 2
function flattenArray(arr) {
  return arr.reduce((result, item) => 
    result.concat(Array.isArray(item) ? flattenArray(item) : item), []);
}

// Pattern 3
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Pattern 4
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] === undefined) {
      cache[key] = fn.apply(this, args);
    }
    return cache[key];
  };
}

// Pattern 5
function pipe(...fns) {
  return function(x) {
    return fns.reduce((v, f) => f(v), x);
  };
}`;

export default function PatternPuzzleChallenge() {
  const toast = useToast();
  const [solution, setSolution] = useState('');
  const [hint, setHint] = useState('');
  const [hasUsedHint, setHasUsedHint] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const { completeChallenge, getNextChallenge } = useChallenges();
  const trackId = 'software-development';
  const challengeId = 'pattern-puzzle';
  
  const nextChallenge = getNextChallenge(trackId, challengeId);

  const requestHint = () => {
    setHint("Look for common programming patterns in the functions. Each one represents a specific reusable pattern that solves a particular problem. Consider what each one is trying to achieve in a general sense.");
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

    const submission: PatternSubmission = {
      solution: solution.trim(),
      usedHint: hasUsedHint,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      track: trackId,
      challengeId: challengeId,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('/api/submit-pattern', {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Pattern Puzzle Challenge</h1>
          <p className="text-gray-600 mb-4">
            Welcome to the Pattern Puzzle Challenge! Below you'll find five different JavaScript functions.
            Your task is to identify the common programming patterns each function demonstrates,
            explain what each pattern does, and describe when you might use it in real-world development.
          </p>
          <p className="text-gray-600 mb-4">
            Being able to recognize and implement these patterns will help you write more efficient and maintainable code.
          </p>
        </div>

        <ChallengeProgressTracker trackId={trackId} currentChallengeId={challengeId} />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Programming Patterns</CardTitle>
            <CardDescription>
              Identify and explain the patterns implemented in each of these functions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{patternCode}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Solution</CardTitle>
            <CardDescription>
              For each pattern, provide: 1) The name of the pattern, 2) What it does, and 3) When you would use it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Explain each of the five patterns shown in the code..."
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
          prevPath="/challenges/debug-detective" 
          nextPath={nextChallenge?.path} 
          isCompleted={submitted}
        />
      </div>
    </div>
  );
}
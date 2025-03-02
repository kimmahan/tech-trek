// app/challenges/data-science/page.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DataAnalysisChallenge from './DataAnalysisChallenge';

export default function DataSciencePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Data Science Track</h1>
        <Link href="/">
          <Button variant="outline">Back to Tracks</Button>
        </Link>
      </div>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <p className="text-lg">
          Welcome to the Data Science track! Complete the following challenges to demonstrate your data analysis skills.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Challenge 1: Data Analysis */}
        <DataAnalysisChallenge />
      </div>
    </div>
  );
}
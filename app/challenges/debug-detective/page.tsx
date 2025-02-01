'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';

const buggyCode = `function processInventory(items) {
  let total = 0;
  let inStock = [];
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity > 0) {
      inStock.push(items[i]);
      total += items[i].price;
    }
  }
  
  return {
    available: inStock,
    totalValue: total,
    averagePrice: total / items.length  // Bug: Should divide by inStock.length
  };
}

// Test data
const inventory = [
  { id: 1, name: &quot;Laptop&quot;, price: 999.99, quantity: 5 },
  { id: 2, name: &quot;Mouse&quot;, price: 24.99, quantity: 0 },
  { id: 3, name: &quot;Keyboard&quot;, price: 59.99, quantity: 2 }
];`;

export default function DebugDetectivePage() {
  const [solution, setSolution] = useState('');
  const [hint, setHint] = useState('');
  const [hasUsedHint, setHasUsedHint] = useState(false);

  const requestHint = () => {
    setHint("Consider what happens when some items have quantity 0. How does this affect the average price calculation?");
    setHasUsedHint(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Debug Detective Challenge</h1>
          <p className="text-gray-600 mb-4">
            Welcome, aspiring debug detective! Your mission is to identify and fix a bug in the
            inventory management system below. The code calculates the total and average price
            of in-stock items, but something&apos;s not quite right...
          </p>
          <p className="text-gray-600 mb-4">
            Feel free to use our free LLM <a href="#" className="text-blue-600 hover:text-blue-800 underline">maxx-gpt</a> if you need help analyzing the problem, but be specific in your questions - this helps us understand your debugging approach!
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buggy Code</CardTitle>
            <CardDescription>
              This inventory management code has a subtle bug. Can you spot it?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <code>{buggyCode}</code>
            </pre>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Solution</CardTitle>
            <CardDescription>
              Explain the bug you found and how you would fix it. Include your reasoning!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Describe the bug, its impact, and your solution..."
              className="min-h-[200px] mb-4 w-full p-2 border rounded-md"
            />
            <div className="flex justify-between items-center">
              <Button 
                variant="outline"
                onClick={requestHint}
                disabled={hasUsedHint}
              >
                Request Hint
              </Button>
              <Button>Submit Solution</Button>
            </div>
            {hint && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-lg">
                {hint}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
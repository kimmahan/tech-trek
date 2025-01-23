import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const challenges = [
  {
    id: 1,
    title: 'Array Sum Bug',
    description: 'This function should sum all numbers in an array, but it\'s not working correctly.',
    code: `function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    hint: 'Check the loop conditions carefully.',
    solution: 'The loop condition should be i < arr.length instead of i <= arr.length to avoid accessing undefined.',
    tests: [
      { input: '[1, 2, 3]', expectedOutput: '6' },
      { input: '[]', expectedOutput: '0' }
    ]
  },
  {
    id: 2,
    title: 'String Reversal Issue',
    description: 'This function should reverse a string, but some characters are being lost.',
    code: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length; i > 0; i--) {
    reversed += str[i];
  }
  return reversed;
}`,
    hint: 'Think about array indexing in JavaScript.',
    solution: 'Array indices should start from length-1, not length',
    tests: [
      { input: '"hello"', expectedOutput: '"olleh"' },
      { input: '"12345"', expectedOutput: '"54321"' }
    ]
  }
];

const DebugChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userSolution, setUserSolution] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const challenge = challenges[currentChallenge];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Debug Detective</h1>
          <p className="text-gray-600">Find and fix bugs in progressively challenging code snippets.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{challenge.title}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Buggy Code:</h3>
              <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                {challenge.code}
              </pre>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Test Cases:</h3>
              <ul className="space-y-2">
                {challenge.tests.map((test, index) => (
                  <li key={index} className="text-sm">
                    Input: {test.input} → Expected Output: {test.expectedOutput}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Your Solution:</h3>
              <textarea
                value={userSolution}
                onChange={(e) => setUserSolution(e.target.value)}
                className="w-full h-40 p-4 border rounded-lg font-mono"
                placeholder="Write your fixed version of the code here..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </button>
              {currentChallenge < challenges.length - 1 && (
                <button
                  onClick={() => {
                    setCurrentChallenge(currentChallenge + 1);
                    setUserSolution('');
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ml-auto"
                >
                  Next Challenge
                </button>
              )}
            </div>

            {showHint && (
              <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                <strong>Hint:</strong> {challenge.hint}
              </div>
            )}

            {showSolution && (
              <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-lg">
                <strong>Solution:</strong> {challenge.solution}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DebugChallenge;
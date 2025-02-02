'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Code, Database, Shield, LineChart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const tracks = [
  {
    title: 'Software Development',
    description: 'Build applications and solve complex programming challenges',
    icon: Code,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    path: '/challenges/debug-detective'
  },
  {
    title: 'Data Science',
    description: 'Analyze data and create predictive models',
    icon: LineChart,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    path: '/challenges/data-analysis'
  },
  {
    title: 'Cybersecurity',
    description: 'Protect systems and networks from security threats',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    path: '/challenges/security'
  },
  {
    title: 'Database Management',
    description: 'Design and optimize database systems',
    icon: Database,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    path: '/challenges/database'
  }
];

export default function CareerTracks() {
  const router = useRouter();

  const handleTrackClick = React.useCallback((path: string) => {
    router.push(path);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Tech Career Path
          </h1>
          <p className="text-gray-600 text-lg">
            Select a track to start your personalized tech career assessment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => {
            const IconComponent = track.icon;
            return (
              <div key={track.title} className="relative">
                <Card 
                  className="transition-transform hover:scale-105 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${track.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${track.color}`} />
                      </div>
                      <div>
                        <CardTitle>{track.title}</CardTitle>
                        <CardDescription>{track.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">4 challenges</span>
                      <Button 
                        variant="ghost"
                        onClick={() => handleTrackClick(track.path)}
                      >
                        Start Track →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
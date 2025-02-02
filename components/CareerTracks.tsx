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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" style={{backgroundColor: '#f9fafb'}}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 !text-gray-900" style={{color: '#111827'}}>
            Choose Your Tech Career Path
          </h1>
          <p className="text-base md:text-lg text-gray-600" style={{color: '#4B5563'}}>
            Select a track to start your personalized tech career assessment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {tracks.map((track) => {
            const IconComponent = track.icon;
            return (
              <Card 
                key={track.title} 
                className="transition-all duration-200 hover:shadow-lg border border-gray-200 bg-white"
                style={{backgroundColor: 'white'}}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${track.bgColor} ${track.color}`}>
                      <IconComponent className={`h-6 w-6`} />
                    </div>
                    <div>
                      <CardTitle className="!text-gray-900" style={{color: '#111827'}}>
                        {track.title}
                      </CardTitle>
                      <CardDescription className="!text-gray-600" style={{color: '#4B5563'}}>
                        {track.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500" style={{color: '#6B7280'}}>
                      4 challenges
                    </span>
                    <Button 
                      onClick={() => router.push(track.path)}
                      className="text-sm font-medium bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
                      style={{backgroundColor: 'white', color: '#111827'}}
                    >
                      Start Track →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
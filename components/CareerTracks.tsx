import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Code, Database, Shield, LineChart } from 'lucide-react';

const tracks = [
  {
    title: 'Software Development',
    description: 'Build applications and solve complex programming challenges',
    icon: Code,
    color: 'text-blue-500'
  },
  {
    title: 'Data Science',
    description: 'Analyze data and create predictive models',
    icon: LineChart,
    color: 'text-green-500'
  },
  {
    title: 'Cybersecurity',
    description: 'Protect systems and networks from security threats',
    icon: Shield,
    color: 'text-red-500'
  },
  {
    title: 'Database Management',
    description: 'Design and optimize database systems',
    icon: Database,
    color: 'text-purple-500'
  }
];

export default function CareerTracks() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Tech Career Path</h1>
          <p className="text-gray-600 text-lg">
            Select a track to start your personalized tech career assessment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => {
            const IconComponent = track.icon;
            return (
              <Card key={track.title} className="transition-transform hover:scale-105 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${track.color} bg-opacity-10`}>
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
                    <span className="text-sm font-medium">Start Track →</span>
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
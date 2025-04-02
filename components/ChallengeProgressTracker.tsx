'use client';

import React from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle } from 'lucide-react';
import Link from 'next/link';

interface ChallengeProgressTrackerProps {
  trackId: string;
  currentChallengeId?: string;
}

const ChallengeProgressTracker: React.FC<ChallengeProgressTrackerProps> = ({
  trackId,
  currentChallengeId,
}) => {
  const { tracks } = useChallenges();
  const track = tracks.find((t) => t.id === trackId);

  if (!track) return null;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">{track.title} Progress</h3>
        <div className="flex items-center">
          {track.challenges.map((challenge, index) => (
            <React.Fragment key={challenge.id}>
              <div 
                className={`flex flex-col items-center ${
                  challenge.id === currentChallengeId ? 'text-blue-600 font-medium' : ''
                }`}
              >
                <Link href={challenge.path}>
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className="mb-1">
                      {challenge.completed ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : challenge.id === currentChallengeId ? (
                        <Circle className="text-blue-600" size={24} fill="rgba(37, 99, 235, 0.2)" />
                      ) : (
                        <Circle size={24} className="text-gray-300" />
                      )}
                    </div>
                    <span className="text-xs max-w-[80px] text-center">
                      {challenge.title}
                    </span>
                  </div>
                </Link>
              </div>
              
              {index < track.challenges.length - 1 && (
                <div 
                  className={`h-[2px] w-8 mx-1 ${
                    challenge.completed ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeProgressTracker;
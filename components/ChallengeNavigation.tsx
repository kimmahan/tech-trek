// components/ChallengeNavigation.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChallengeNavigationProps {
  prevPath?: string;
  nextPath?: string;
  showHomeButton?: boolean;
  onComplete?: () => void;
  isCompleted?: boolean;
}

const ChallengeNavigation: React.FC<ChallengeNavigationProps> = ({
  prevPath,
  nextPath,
  showHomeButton = true,
  onComplete,
  isCompleted = false,
}) => {
  const router = useRouter();

  return (
    <div className="w-full mt-8 flex justify-between items-center">
      <div>
        {prevPath && (
          <Button
            variant="outline"
            onClick={() => router.push(prevPath)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous Challenge
          </Button>
        )}
      </div>
      
      <div className="flex gap-4">
        {showHomeButton && (
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <Home size={16} />
            Return to Tracks
          </Button>
        )}
        
        {nextPath && (
          <Button
            onClick={() => router.push(nextPath)}
            disabled={!isCompleted && onComplete !== undefined}
            className="flex items-center gap-2"
          >
            Next Challenge
            <ArrowRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChallengeNavigation;
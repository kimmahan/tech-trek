// context/ChallengeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Track = 'software-development' | 'data-science' | 'cybersecurity' | 'database-management';

interface Challenge {
  id: string;
  title: string;
  path: string;
  track: Track;
  completed: boolean;
}

interface TrackData {
  id: Track;
  title: string;
  description: string;
  challenges: Challenge[];
}

interface ChallengeContextType {
  tracks: TrackData[];
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
  completeChallenge: (trackId: Track, challengeId: string) => void;
  getNextChallenge: (trackId: Track, currentChallengeId: string) => Challenge | null;
  getPrevChallenge: (trackId: Track, currentChallengeId: string) => Challenge | null;
}

const defaultTracks: TrackData[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Explore coding challenges to test your problem-solving abilities',
    challenges: [
      {
        id: 'debug-detective',
        title: 'Debug Detective',
        path: '/challenges/debug-detective',
        track: 'software-development',
        completed: false,
      },
      {
        id: 'pattern-puzzle',
        title: 'Pattern Puzzle',
        path: '/challenges/pattern-puzzle',
        track: 'software-development',
        completed: false,
      },
      {
        id: 'api-adventure',
        title: 'API Adventure',
        path: '/challenges/api-adventure',
        track: 'software-development',
        completed: false,
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description: 'Uncover insights through data analysis challenges',
    challenges: [
      {
        id: 'data-detective',
        title: 'Data Detective',
        path: '/challenges/data-detective',
        track: 'data-science',
        completed: false,
      },
      // Add more data science challenges
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Test your security knowledge and threat identification skills',
    challenges: [
      {
        id: 'security-sleuth',
        title: 'Security Sleuth',
        path: '/challenges/security-sleuth',
        track: 'cybersecurity',
        completed: false,
      },
      // Add more cybersecurity challenges
    ],
  },
  {
    id: 'database-management',
    title: 'Database Management',
    description: 'Solve database design and query optimization challenges',
    challenges: [
      {
        id: 'query-quest',
        title: 'Query Quest',
        path: '/challenges/query-quest',
        track: 'database-management',
        completed: false,
      },
      // Add more database challenges
    ],
  },
];

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState(defaultTracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  // Load progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('challengeProgress');
    if (savedProgress) {
      setTracks(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('challengeProgress', JSON.stringify(tracks));
  }, [tracks]);

  const completeChallenge = (trackId: Track, challengeId: string) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            challenges: track.challenges.map((challenge) => {
              if (challenge.id === challengeId) {
                return { ...challenge, completed: true };
              }
              return challenge;
            }),
          };
        }
        return track;
      })
    );
  };

  const getNextChallenge = (trackId: Track, currentChallengeId: string): Challenge | null => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return null;

    const currentIndex = track.challenges.findIndex((c) => c.id === currentChallengeId);
    if (currentIndex === -1 || currentIndex >= track.challenges.length - 1) return null;

    return track.challenges[currentIndex + 1];
  };

  const getPrevChallenge = (trackId: Track, currentChallengeId: string): Challenge | null => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return null;

    const currentIndex = track.challenges.findIndex((c) => c.id === currentChallengeId);
    if (currentIndex <= 0) return null;

    return track.challenges[currentIndex - 1];
  };

  return (
    <ChallengeContext.Provider
      value={{
        tracks,
        currentTrack,
        setCurrentTrack,
        completeChallenge,
        getNextChallenge,
        getPrevChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};
// types.ts
export interface DebugSubmission {
    solution: string;
    usedHint: boolean;
    timeSpent: number;
    timestamp?: string;
    track: string;
    challengeId: string;
  }
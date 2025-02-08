// lib/challenges/debug-detective/service.ts

export interface DebugSubmission {
    solution: string;
    usedHint: boolean;
    timestamp: string;
    timeSpent: number;
    track: string;
    challengeId: string;
  }
  
  class DebugChallengeService {
    private readonly STORAGE_KEY = 'debug-detective-submissions';
  
    async submitSolution(submission: Omit<DebugSubmission, 'timestamp'>): Promise<DebugSubmission> {
      const finalSubmission: DebugSubmission = {
        ...submission,
        timestamp: new Date().toISOString(),
      };
  
      try {
        const existingSubmissions = this.getStoredSubmissions();
        existingSubmissions.push(finalSubmission);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingSubmissions));
        
        return finalSubmission;
      } catch (error) {
        console.error('Failed to store submission:', error);
        throw new Error('Failed to store submission');
      }
    }
  
    getStoredSubmissions(): DebugSubmission[] {
      try {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
  }
  
  export const debugChallengeService = new DebugChallengeService();
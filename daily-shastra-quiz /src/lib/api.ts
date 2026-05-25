/**
 * Google Apps Script API Client
 * Set NEXT_PUBLIC_GAS_URL in your Vercel environment variables
 */

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

async function call<T>(action: string, params: Record<string, unknown> = {}): Promise<T> {
  if (!GAS_URL) throw new Error('GAS_URL not set');
  const res = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...params }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'API error');
  return json.data as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type RemoteQuestion = {
  lessonId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: string;
};

export type User = {
  username: string;
  xp: number;
  level: number;
  badge: string;
  streak: number;
  lastActive: string;
  totalQuizzes: number;
  perfectScores: number;
};

export type QuizResult = {
  xpEarned: number;
  newXP: number;
  newLevel: number;
  newBadge: string;
  newStreak: number;
  isPerfect: boolean;
  accuracy: number;
  leveledUp: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  xp: number;
  badge: string;
  streak: number;
  totalQuizzes: number;
};

// ─── API calls ────────────────────────────────────────────────────────────────

export const api = {
  getQuestions: (lessonId?: string) =>
    call<{ questions: RemoteQuestion[] }>('getQuestions', { lessonId }),

  registerUser: (username: string) =>
    call<{ user: User; isNew: boolean }>('registerUser', { username }),

  getUser: (username: string) =>
    call<{ user: User }>('getUser', { username }),

  submitQuiz: (data: { username: string; lessonId: string; score: number; total: number }) =>
    call<QuizResult>('submitQuiz', data),

  getLeaderboard: (type: 'xp' | 'streak' | 'quizzes' = 'xp') =>
    call<{ leaderboard: LeaderboardEntry[] }>('getLeaderboard', { type }),

  updateStreak: (username: string) =>
    call<{ newStreak: number }>('updateStreak', { username }),
};

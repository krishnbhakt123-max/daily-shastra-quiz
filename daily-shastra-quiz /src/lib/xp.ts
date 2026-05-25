/**
 * XP System — Daily Shastra Quiz
 * Handles XP calculation, leveling, and badge assignment
 */

export const LEVELS = [
  { level: 1,  title: 'Seeker',         minXP: 0,      icon: '🌱' },
  { level: 2,  title: 'Student',        minXP: 200,    icon: '📚' },
  { level: 3,  title: 'Disciple',       minXP: 500,    icon: '🙏' },
  { level: 4,  title: 'Sadhaka',        minXP: 1000,   icon: '🧘' },
  { level: 5,  title: 'Devotee',        minXP: 1800,   icon: '🕯️' },
  { level: 6,  title: 'Bhakta',         minXP: 3000,   icon: '🪷' },
  { level: 7,  title: 'Scholar',        minXP: 5000,   icon: '📖' },
  { level: 8,  title: 'Dharma Scholar', minXP: 8000,   icon: '⭐' },
  { level: 9,  title: 'Acharya',        minXP: 12000,  icon: '🌟' },
  { level: 10, title: 'Guru',           minXP: 20000,  icon: '👑' },
];

export type LevelInfo = (typeof LEVELS)[number];

export function getLevelInfo(xp: number): LevelInfo & { nextLevelXP: number; progress: number } {
  let currentLevel = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.minXP) currentLevel = level;
  }

  const currentIndex = LEVELS.indexOf(currentLevel);
  const nextLevel = LEVELS[currentIndex + 1];
  const nextLevelXP = nextLevel?.minXP ?? currentLevel.minXP;
  const progress = nextLevel
    ? ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100
    : 100;

  return { ...currentLevel, nextLevelXP, progress: Math.min(progress, 100) };
}

export const XP_REWARDS = {
  correctAnswer: 20,
  perfectScore: 50,
  lessonComplete: 50,
  dailyChallenge: 75,
  streak7: 100,
  streak30: 500,
  streak100: 2000,
  firstQuiz: 25,
} as const;

export function calculateQuizXP(score: number, total: number): number {
  const correctXP = score * XP_REWARDS.correctAnswer;
  const perfectBonus = score === total ? XP_REWARDS.perfectScore : 0;
  const completionBonus = XP_REWARDS.lessonComplete;
  return correctXP + perfectBonus + completionBonus;
}

export type Badge = {
  id: string;
  name: string;
  icon: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond' | 'special';
  requirement: string;
  check: (user: { xp: number; streak: number; totalQuizzes: number; perfectScores?: number }) => boolean;
};

export const BADGES: Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    icon: '🥉',
    description: 'Completed your first quiz',
    tier: 'bronze',
    requirement: 'Complete 1 quiz',
    check: u => u.totalQuizzes >= 1,
  },
  {
    id: 'devoted',
    name: 'Devoted',
    icon: '🔥',
    description: 'Achieved a 7-day streak',
    tier: 'silver',
    requirement: '7-day streak',
    check: u => u.streak >= 7,
  },
  {
    id: 'scholar',
    name: 'Scholar',
    icon: '📖',
    description: 'Completed 25 lessons',
    tier: 'silver',
    requirement: '25 lessons completed',
    check: u => u.totalQuizzes >= 25,
  },
  {
    id: 'gold-seeker',
    name: 'Gold Seeker',
    icon: '🥇',
    description: 'Reached 5,000 XP',
    tier: 'gold',
    requirement: '5,000 XP',
    check: u => u.xp >= 5000,
  },
  {
    id: 'diamond-guru',
    name: 'Diamond Guru',
    icon: '💎',
    description: 'Reached 20,000 XP or 100-day streak',
    tier: 'diamond',
    requirement: '20,000 XP or 100-day streak',
    check: u => u.xp >= 20000 || u.streak >= 100,
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    icon: '🔥',
    description: 'Scored perfect on 5 quizzes',
    tier: 'special',
    requirement: '5 perfect scores',
    check: u => (u.perfectScores ?? 0) >= 5,
  },
  {
    id: 'atma-jnani',
    name: 'Atma Jnani',
    icon: '🕉',
    description: 'Reached level 10 (Guru)',
    tier: 'special',
    requirement: 'Reach level 10',
    check: u => u.xp >= 20000,
  },
  {
    id: 'bhakta',
    name: 'Bhakta',
    icon: '🪷',
    description: 'Completed Bhakti Yoga module',
    tier: 'special',
    requirement: 'Complete Bhakti Yoga',
    check: () => false, // Set by lesson completion
  },
];

export function getEarnedBadges(user: {
  xp: number;
  streak: number;
  totalQuizzes: number;
  perfectScores?: number;
}): Badge[] {
  return BADGES.filter(badge => badge.check(user));
}

export const DAILY_QUOTES = [
  {
    text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
    source: "Bhagavad Gita 2.47",
  },
  {
    text: "For the soul there is never birth nor death. It is not born, and it does not die.",
    source: "Bhagavad Gita 2.20",
  },
  {
    text: "Abandon all varieties of dharmas and simply surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    source: "Bhagavad Gita 18.66",
  },
  {
    text: "The mind is restless and difficult to restrain, but it is subdued by practice and detachment.",
    source: "Bhagavad Gita 6.35",
  },
  {
    text: "One who sees inaction in action and action in inaction is intelligent among men.",
    source: "Bhagavad Gita 4.18",
  },
];

export function getDailyQuote(): typeof DAILY_QUOTES[number] {
  const day = new Date().getDay();
  return DAILY_QUOTES[day % DAILY_QUOTES.length];
}

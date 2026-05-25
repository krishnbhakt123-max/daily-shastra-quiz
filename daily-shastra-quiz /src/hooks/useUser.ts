'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { getLevelInfo, getEarnedBadges } from '@/lib/xp';

export type LocalUser = {
  username: string;
  xp: number;
  streak: number;
  lastActive: string;
  totalQuizzes: number;
  perfectScores: number;
  completedLessons: string[];
};

const DEFAULT_USER: LocalUser = {
  username: '',
  xp: 0,
  streak: 0,
  lastActive: '',
  totalQuizzes: 0,
  perfectScores: 0,
  completedLessons: [],
};

export function useUser() {
  const [user, setUser] = useState<LocalUser>(DEFAULT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('dsq_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsLoggedIn(true);
      checkAndUpdateStreak(parsed);
    }
  }, []);

  function checkAndUpdateStreak(u: LocalUser) {
    if (!u.lastActive) return;
    const last = new Date(u.lastActive);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      const reset = { ...u, streak: 0 };
      saveUser(reset);
    }
  }

  function saveUser(u: LocalUser) {
    localStorage.setItem('dsq_user', JSON.stringify(u));
    setUser(u);
  }

  function login(username: string) {
    // Register in Google Sheets (fire and forget)
    api.registerUser(username).catch(() => {});
    const existing = localStorage.getItem('dsq_user');
    if (existing) {
      const parsed = JSON.parse(existing);
      if (parsed.username === username) {
        setUser(parsed);
        setIsLoggedIn(true);
        return;
      }
    }
    const newUser: LocalUser = {
      ...DEFAULT_USER,
      username,
      lastActive: new Date().toISOString(),
    };
    saveUser(newUser);
    setIsLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem('dsq_user');
    setUser(DEFAULT_USER);
    setIsLoggedIn(false);
  }

  function addXP(amount: number) {
    const updated = {
      ...user,
      xp: user.xp + amount,
      lastActive: new Date().toISOString(),
    };
    // Update streak
    const last = user.lastActive ? new Date(user.lastActive) : null;
    const now = new Date();
    if (last) {
      const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) updated.streak = user.streak + 1;
      else if (diffDays === 0) updated.streak = user.streak;
      else updated.streak = 1;
    } else {
      updated.streak = 1;
    }
    saveUser(updated);
  }

  function completeQuiz(lessonId: string, isPerfect: boolean, xpEarned: number) {
    const updated: LocalUser = {
      ...user,
      xp: user.xp + xpEarned,
      totalQuizzes: user.totalQuizzes + 1,
      perfectScores: user.perfectScores + (isPerfect ? 1 : 0),
      lastActive: new Date().toISOString(),
      completedLessons: user.completedLessons.includes(lessonId)
        ? user.completedLessons
        : [...user.completedLessons, lessonId],
    };
    // Streak logic
    const last = user.lastActive ? new Date(user.lastActive) : null;
    const now = new Date();
    if (last) {
      const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 1) updated.streak = diffDays === 1 ? user.streak + 1 : 1;
    } else {
      updated.streak = 1;
    }
    saveUser(updated);
    return updated;
  }

  const levelInfo = getLevelInfo(user.xp);
  const badges = getEarnedBadges(user);

  return {
    user,
    isLoggedIn,
    mounted,
    levelInfo,
    badges,
    login,
    logout,
    addXP,
    completeQuiz,
  };
}

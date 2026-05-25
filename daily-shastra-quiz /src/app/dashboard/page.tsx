'use client';

import { useUser } from '@/hooks/useUser';
import { MODULES } from '@/lib/questions';
import { BADGES } from '@/lib/xp';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, isLoggedIn, levelInfo, badges, login, mounted } = useUser();
  const [inputName, setInputName] = useState('');

  if (!mounted) return null;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,131,42,0.1) 0%, transparent 60%), var(--parchment)' }}>
        <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center"
          style={{ border: '1px solid rgba(201,148,58,0.3)', boxShadow: '0 20px 60px rgba(26,18,10,0.12)' }}>
          <div className="text-5xl mb-4">🪷</div>
          <h1 className="font-cormorant text-3xl font-bold mb-2">Welcome, Seeker</h1>
          <p className="mb-8 font-light" style={{ color: 'var(--ink-muted)' }}>Enter your name to begin your sacred journey</p>
          <input
            className="w-full px-5 py-3 rounded-xl text-base mb-4 outline-none transition-all"
            style={{
              border: '2px solid rgba(201,148,58,0.3)',
              fontFamily: 'var(--font-crimson), serif',
              color: 'var(--ink)',
              background: 'var(--parchment)',
            }}
            placeholder="Your sacred name..."
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && inputName.trim() && login(inputName.trim())}
          />
          <button className="btn-primary w-full py-3"
            onClick={() => inputName.trim() && login(inputName.trim())}>
            Begin Journey 🕉
          </button>
        </div>
      </div>
    );
  }

  const earnedBadgeIds = new Set(badges.map(b => b.id));
  const today = new Date().getDate();
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const activeDays = [1,2,3,5,6,7,9,12,13,14,16,17,19,20,21,22,23];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Welcome banner */}
      <div className="rounded-2xl p-8 mb-6 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--saffron-deep) 0%, #8B4513 100%)' }}>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-9xl opacity-10 pointer-events-none">🕉</div>
        <h1 className="font-cormorant text-3xl font-semibold mb-1">Hare Krishna, {user.username} 🙏</h1>
        <p className="opacity-85">
          {user.streak > 0
            ? `You're on a ${user.streak}-day streak! Keep the sacred flame burning.`
            : 'Start your first quiz today and begin your devotional journey!'}
        </p>
        <Link href="/quiz">
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full font-cinzel text-xs tracking-wide cursor-pointer transition-all"
            style={{ background: 'rgba(255,255,255,0.2)' }}>
            🎯 Daily Challenge — Start Now
          </div>
        </Link>
      </div>

      {/* XP bar */}
      <div className="bg-white rounded-xl p-5 mb-4" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
        <div className="flex justify-between font-cinzel text-sm mb-3" style={{ color: 'var(--ink-muted)' }}>
          <span>Level {levelInfo.level} · {levelInfo.icon} {levelInfo.title}</span>
          <span>{user.xp.toLocaleString()} / {levelInfo.nextLevelXP.toLocaleString()} XP</span>
        </div>
        <div className="xp-bar">
          <div className="xp-bar-fill" style={{ width: `${levelInfo.progress}%` }} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: '✨', value: user.xp.toLocaleString(), label: 'Total XP' },
          { icon: '🔥', value: user.streak.toString(), label: 'Day Streak' },
          { icon: '📖', value: user.totalQuizzes.toString(), label: 'Quizzes Done' },
          { icon: '🎯', value: user.totalQuizzes > 0 ? `${Math.round((user.perfectScores / user.totalQuizzes) * 100)}%` : '—', label: 'Perfect Rate' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5 text-center transition-all hover:-translate-y-0.5"
            style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-cinzel text-2xl font-bold" style={{ color: 'var(--saffron-deep)' }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--ink-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
          <div className="flex items-center justify-between mb-5">
            <span className="font-cinzel font-semibold">📚 Your Lessons</span>
            <Link href="/quiz"><button className="btn-primary text-xs py-2 px-4">Continue</button></Link>
          </div>
          {MODULES.map((mod, i) => {
            const done = user.completedLessons.includes(mod.id);
            const active = !done && i === MODULES.findIndex(m => !user.completedLessons.includes(m.id));
            const locked = !done && !active;
            return (
              <Link key={mod.id} href={locked ? '#' : `/quiz?lesson=${mod.id}`} className="no-underline">
                <div className="flex items-center gap-3 py-3 px-2 rounded-xl transition-all duration-200 cursor-pointer hover:bg-orange-50 border-b last:border-0"
                  style={{ borderColor: 'rgba(201,148,58,0.1)' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: done ? 'linear-gradient(135deg, var(--saffron), var(--gold))'
                        : active ? 'linear-gradient(135deg, var(--teal), var(--teal-light))'
                        : 'rgba(107,79,56,0.12)',
                      animation: active ? 'pulseDot 2s infinite' : 'none',
                    }}>
                    {done ? '✅' : active ? '▶' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm" style={{ color: locked ? 'var(--ink-muted)' : 'var(--ink)' }}>
                      {mod.icon} {mod.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-muted)' }}>
                      {done ? 'Completed ✓' : active ? 'In Progress' : 'Locked'}
                      {' · '}{mod.lessonCount} lessons
                    </div>
                  </div>
                  <span className="font-cinzel text-xs font-semibold" style={{ color: 'var(--gold)' }}>
                    +{mod.xpReward} XP
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5">
          {/* Streak calendar */}
          <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
            <div className="font-cinzel font-semibold text-sm mb-4">📅 This Month</div>
            <div className="grid grid-cols-7 gap-1">
              {['S','M','T','W','T','F','S'].map((d, i) => (
                <div key={i} className="text-center text-xs font-cinzel py-1" style={{ color: 'var(--ink-muted)' }}>{d}</div>
              ))}
              {days.map(d => (
                <div key={d}
                  className="aspect-square rounded-md flex items-center justify-center text-xs font-cinzel transition-all"
                  style={{
                    background: activeDays.includes(d)
                      ? 'linear-gradient(135deg, var(--saffron), var(--gold))' : 'rgba(201,148,58,0.1)',
                    color: activeDays.includes(d) ? 'white'
                      : d === today ? 'var(--saffron-deep)' : 'var(--ink-muted)',
                    border: d === today ? '2px solid var(--saffron)' : 'none',
                    fontWeight: activeDays.includes(d) ? '600' : '400',
                  }}>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
            <div className="font-cinzel font-semibold text-sm mb-1">🏆 Badges</div>
            <div className="text-xs mb-4" style={{ color: 'var(--ink-muted)' }}>{badges.length} of {BADGES.length} earned</div>
            <div className="grid grid-cols-3 gap-2">
              {BADGES.slice(0, 6).map(b => {
                const earned = earnedBadgeIds.has(b.id);
                return (
                  <div key={b.id}
                    className="text-center p-2 rounded-lg"
                    style={{
                      border: `1px solid ${earned ? 'var(--gold-light)' : 'rgba(201,148,58,0.15)'}`,
                      background: earned ? 'rgba(240,192,96,0.08)' : 'transparent',
                      opacity: earned ? 1 : 0.4,
                      filter: earned ? 'none' : 'grayscale(1)',
                    }}>
                    <div className="text-2xl">{b.icon}</div>
                    <div className="font-cinzel text-xs mt-1" style={{ color: 'var(--ink)' }}>{b.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46,158,158,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(46,158,158,0); }
        }
      `}</style>
    </div>
  );
}

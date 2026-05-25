'use client';
import { useUser } from '@/hooks/useUser';
import { BADGES } from '@/lib/xp';

export default function ProfilePage() {
  const { user, isLoggedIn, levelInfo, badges, logout, mounted } = useUser();
  if (!mounted) return null;
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <p className="font-cormorant text-2xl mb-4" style={{ color: 'var(--ink-muted)' }}>No profile yet</p>
        <a href="/dashboard"><button className="btn-primary">Start Your Journey</button></a>
      </div>
    );
  }

  const earnedIds = new Set(badges.map(b => b.id));
  const activityLevels = [0,1,0,2,1,3,4,2,0,1,2,4,3,2,1,0,3,4,4,3,2,1,2,4,3,2,1,4,4,4];
  const bgForLevel = (l: number) => {
    if (l === 0) return 'rgba(201,148,58,0.1)';
    if (l === 1) return 'rgba(232,131,42,0.2)';
    if (l === 2) return 'rgba(232,131,42,0.4)';
    if (l === 3) return 'rgba(232,131,42,0.65)';
    return 'linear-gradient(135deg, var(--saffron), var(--gold))';
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="rounded-2xl p-10 text-center text-white mb-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--saffron-deep), var(--lotus))' }}>
        <div className="absolute text-[10rem] opacity-[0.07] right-[-2rem] top-[-2rem] pointer-events-none">🕉</div>
        <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold"
          style={{ background: 'white', color: 'var(--saffron-deep)', border: '4px solid rgba(255,255,255,0.4)' }}>
          {user.username[0]?.toUpperCase()}
        </div>
        <h1 className="font-cinzel text-2xl font-semibold mb-1">{user.username}</h1>
        <p className="font-cinzel text-sm tracking-widest opacity-85">
          {levelInfo.icon} Level {levelInfo.level} · {levelInfo.title}
        </p>
        <div className="flex justify-center gap-8 mt-6">
          {[
            [user.xp.toLocaleString(), 'Total XP'],
            [`🔥 ${user.streak}`, 'Streak'],
            [user.totalQuizzes.toString(), 'Quizzes'],
            [user.perfectScores.toString(), 'Perfects'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-cinzel text-xl font-bold">{v}</div>
              <div className="text-xs opacity-75 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* XP Progress */}
      <div className="bg-white rounded-xl p-5 mb-5" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
        <div className="flex justify-between font-cinzel text-sm mb-2" style={{ color: 'var(--ink-muted)' }}>
          <span>Progress to Level {levelInfo.level + 1}</span>
          <span>{user.xp.toLocaleString()} / {levelInfo.nextLevelXP.toLocaleString()} XP</span>
        </div>
        <div className="xp-bar"><div className="xp-bar-fill" style={{ width: `${levelInfo.progress}%` }} /></div>
      </div>

      {/* Activity chart */}
      <div className="bg-white rounded-2xl p-6 mb-5" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
        <div className="font-cinzel font-semibold mb-1">📅 Activity This Month</div>
        <div className="text-sm mb-4" style={{ color: 'var(--ink-muted)' }}>Daily practice heatmap</div>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(28px, 1fr))' }}>
          {activityLevels.map((l, i) => (
            <div key={i} className="h-7 rounded"
              style={{ background: bgForLevel(l), transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scaleY(1.15)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scaleY(1)')} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs" style={{ color: 'var(--ink-muted)' }}>
          <span>Less</span>
          {[0,1,2,3,4].map(l => (
            <div key={l} className="w-3.5 h-3.5 rounded-sm" style={{ background: bgForLevel(l) }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 mb-6" style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
        <div className="font-cinzel font-semibold mb-1">🏆 Achievements</div>
        <div className="text-sm mb-5" style={{ color: 'var(--ink-muted)' }}>{badges.length} of {BADGES.length} earned</div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {BADGES.map(b => {
            const earned = earnedIds.has(b.id);
            return (
              <div key={b.id} title={b.description}
                className="text-center p-3 rounded-xl transition-all duration-300"
                style={{
                  border: `1px solid ${earned ? 'var(--gold)' : 'rgba(201,148,58,0.15)'}`,
                  background: earned ? 'rgba(240,192,96,0.07)' : 'transparent',
                  opacity: earned ? 1 : 0.35,
                  filter: earned ? 'none' : 'grayscale(0.9)',
                }}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="font-cinzel text-xs" style={{ color: 'var(--ink)' }}>{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={logout} className="btn-secondary w-full">Sign Out</button>
    </div>
  );
}

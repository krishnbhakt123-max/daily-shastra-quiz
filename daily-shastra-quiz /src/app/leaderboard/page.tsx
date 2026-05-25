'use client';
import { useState, useEffect } from 'react';
import { api, LeaderboardEntry } from '@/lib/api';

const COLORS = [
  'linear-gradient(135deg,#FF6B6B,#FF9B35)',
  'linear-gradient(135deg,#6B9BFF,#9B6BFF)',
  'linear-gradient(135deg,#6BFF9B,#35D4D4)',
  'linear-gradient(135deg,#D4AF37,#8B6914)',
  'linear-gradient(135deg,#E8832A,#C9943A)',
  'linear-gradient(135deg,#FF9B9B,#9B35FF)',
  'linear-gradient(135deg,#35FFBF,#3580FF)',
  'linear-gradient(135deg,#FFD735,#FF6B35)',
];

type Tab = 'xp' | 'streak' | 'quizzes';

const MOCK: LeaderboardEntry[] = [
  { rank:1, username:'Arjuna108',       xp:42000, badge:'💎', streak:45, totalQuizzes:210 },
  { rank:2, username:'KrishnaDevotee',  xp:38200, badge:'💎', streak:38, totalQuizzes:180 },
  { rank:3, username:'Vedant_Seeks',    xp:32500, badge:'🥇', streak:22, totalQuizzes:150 },
  { rank:4, username:'RadhaMadhav',     xp:28900, badge:'🥇', streak:18, totalQuizzes:130 },
  { rank:5, username:'Ananya_Bhakti',   xp:2450,  badge:'🥈', streak:7,  totalQuizzes:34  },
  { rank:6, username:'SadhanaPath',     xp:2100,  badge:'🥉', streak:5,  totalQuizzes:28  },
  { rank:7, username:'GitaLover99',     xp:1800,  badge:'🥉', streak:3,  totalQuizzes:20  },
  { rank:8, username:'MokshaSeeking',   xp:1400,  badge:'⭐', streak:2,  totalQuizzes:14  },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<Tab>('xp');
  const [entries, setEntries] = useState<LeaderboardEntry[]>(MOCK);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    api.getLeaderboard(tab)
      .then(({ leaderboard }) => {
        if (leaderboard.length > 0) {
          setEntries(leaderboard);
          setIsLive(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [tab]);

  const sorted = [...entries].sort((a, b) => {
    if (tab === 'streak')  return b.streak - a.streak;
    if (tab === 'quizzes') return b.totalQuizzes - a.totalQuizzes;
    return b.xp - a.xp;
  }).map((e, i) => ({ ...e, rank: i + 1 }));

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <span className="tag-pill">🏆 Rankings</span>
        <h1 className="font-cormorant text-4xl font-bold mt-3 mb-2">Leaderboard</h1>
        <p className="font-light" style={{ color: 'var(--ink-muted)' }}>
          The most devoted seekers on the path of Vedic wisdom
        </p>
        {isLive && (
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-cinzel"
            style={{ background: 'rgba(46,158,158,0.1)', color: 'var(--teal)' }}>
            🟢 Live from Google Sheets
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 p-1 rounded-full" style={{ background: 'white', border: '1px solid rgba(201,148,58,0.2)' }}>
        {([['xp','✨ XP'],['streak','🔥 Streak'],['quizzes','📖 Quizzes']] as [Tab,string][]).map(([t,label]) => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-full font-cinzel text-xs cursor-pointer transition-all"
            style={{
              border: 'none',
              background: tab === t ? 'linear-gradient(135deg, var(--saffron-deep), var(--saffron-light))' : 'transparent',
              color: tab === t ? 'white' : 'var(--ink-muted)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-4xl animate-float">🕉</div>
      ) : (
        <>
          {/* Podium */}
          <div className="flex items-end justify-center gap-4 mb-10 px-4">
            {[top3[1], top3[0], top3[2]].map((entry, podiumPos) => {
              if (!entry) return null;
              const heights = [75, 100, 55];
              const sizes   = [56, 70, 52];
              const medals  = ['🥈','🥇','🥉'];
              return (
                <div key={entry.username} className="flex-1 max-w-[160px] text-center">
                  {podiumPos === 1 && <div className="text-2xl mb-1">👑</div>}
                  <div className="rounded-full mx-auto flex items-center justify-center text-white font-bold mb-3"
                    style={{ width:sizes[podiumPos], height:sizes[podiumPos], background:COLORS[(entry.rank-1)%COLORS.length], fontSize: podiumPos===1?'1.3rem':'1rem' }}>
                    {entry.username[0]?.toUpperCase()}
                  </div>
                  <div className="font-semibold text-sm mb-0.5">{entry.username}</div>
                  <div className="font-cinzel text-xs font-bold mb-1" style={{ color:'var(--gold)' }}>
                    {tab==='streak' ? `🔥 ${entry.streak} days` : tab==='quizzes' ? `📖 ${entry.totalQuizzes}` : `${entry.xp.toLocaleString()} XP`}
                  </div>
                  <div className="rounded-t-xl flex items-center justify-center"
                    style={{ height:heights[podiumPos], background:['#C0C0C0','#FFD700','#CD7F32'][podiumPos] }}>
                    <span className="text-white font-cinzel font-bold text-xl">{entry.rank}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full list */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border:'1px solid rgba(201,148,58,0.2)' }}>
            {rest.map((entry, i) => (
              <div key={entry.username}
                className="flex items-center gap-3 px-5 py-4 transition-colors"
                style={{ borderBottom:'1px solid rgba(201,148,58,0.08)' }}>
                <span className="font-cinzel font-bold w-7 text-sm" style={{ color:'var(--ink-muted)' }}>{entry.rank}</span>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background:COLORS[(entry.rank-1)%COLORS.length] }}>
                  {entry.username[0]?.toUpperCase()}
                </div>
                <span className="flex-1 font-medium text-sm">{entry.username}</span>
                <span className="text-sm" style={{ color:'var(--saffron)' }}>🔥 {entry.streak}</span>
                <span className="text-base">{entry.badge}</span>
                <span className="font-cinzel text-sm font-bold" style={{ color:'var(--gold)', minWidth:80, textAlign:'right' }}>
                  {tab==='streak' ? `${entry.streak}d` : tab==='quizzes' ? `${entry.totalQuizzes} quiz` : `${entry.xp.toLocaleString()} XP`}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

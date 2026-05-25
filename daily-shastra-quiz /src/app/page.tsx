import Link from 'next/link';
import { MODULES } from '@/lib/questions';
import { getDailyQuote } from '@/lib/xp';

export default function HomePage() {
  const quote = getDailyQuote();

  return (
    <div className="sacred-bg">
      {/* Hero */}
      <section className="min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-20"
        style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(232,131,42,0.14) 0%, transparent 60%)' }}>
        <div className="font-cinzel text-xs tracking-[0.25em] mb-6" style={{ color: 'var(--saffron)' }}>
          ✦ DUOLINGO FOR VEDIC WISDOM ✦
        </div>
        <h1 className="font-cormorant text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-3xl"
          style={{ color: 'var(--ink)' }}>
          Learn the{' '}
          <span className="italic" style={{ color: 'var(--saffron-deep)' }}>Bhagavad Gita</span>
          <br />One Lesson at a Time
        </h1>
        <p className="text-xl max-w-lg leading-relaxed mb-12 font-light" style={{ color: 'var(--ink-muted)' }}>
          Gamified daily quizzes on Bhagavad Gita, Dharma, Karma, Bhakti Yoga & Vedic wisdom.
          Earn XP, build streaks, unlock badges.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mb-16">
          <Link href="/quiz">
            <button className="btn-primary text-lg px-10 py-4">🕉 Begin Your Journey</button>
          </Link>
          <Link href="/dashboard">
            <button className="btn-secondary text-lg px-10 py-4">View Dashboard →</button>
          </Link>
        </div>
        <div className="flex gap-12 flex-wrap justify-center">
          {[
            ['12,400+', 'Seekers Learning'],
            ['480+', 'Quiz Questions'],
            ['24', 'Lesson Modules'],
            ['1M+', 'XP Earned'],
          ].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-cinzel text-3xl font-bold" style={{ color: 'var(--saffron-deep)' }}>{num}</div>
              <div className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Wisdom */}
      <div className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="rounded-2xl p-12 text-center text-white"
          style={{ background: 'linear-gradient(135deg, var(--saffron-deep) 0%, var(--lotus) 100%)' }}>
          <div className="font-cinzel text-xs tracking-widest mb-4 opacity-80">✦ TODAY'S SHLOKA ✦</div>
          <blockquote className="font-cormorant text-2xl md:text-3xl italic font-normal leading-relaxed mb-4 max-w-2xl mx-auto">
            "{quote.text}"
          </blockquote>
          <cite className="font-cinzel text-xs tracking-[0.15em] opacity-80">— {quote.source}</cite>
        </div>
      </div>

      {/* Modules */}
      <div className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="tag-pill">📚 Curriculum</span>
          <h2 className="font-cormorant text-4xl font-semibold mt-4 mb-3">Sacred Knowledge Modules</h2>
          <p className="text-lg font-light" style={{ color: 'var(--ink-muted)' }}>
            Journey through the timeless wisdom of Sanatana Dharma
          </p>
          <div className="w-20 h-0.5 mx-auto mt-4" style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map(mod => (
            <Link key={mod.id} href={`/quiz?lesson=${mod.id}`} className="no-underline">
              <div className="bg-white rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                style={{ border: '1px solid rgba(201,148,58,0.25)' }}>
                <div className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: 'linear-gradient(90deg, var(--saffron), var(--gold))' }} />
                <div className="text-4xl mb-3">{mod.icon}</div>
                <div className="font-cinzel font-semibold text-lg mb-1">{mod.title}</div>
                <span className="inline-block text-xs font-cinzel px-2 py-0.5 rounded-full mb-3"
                  style={{
                    background: mod.difficulty === 'beginner'
                      ? 'rgba(46,158,158,0.15)' : mod.difficulty === 'intermediate'
                      ? 'rgba(232,131,42,0.15)' : 'rgba(139,34,82,0.15)',
                    color: mod.difficulty === 'beginner' ? 'var(--teal)'
                      : mod.difficulty === 'intermediate' ? 'var(--saffron-deep)' : 'var(--lotus)',
                  }}>
                  {mod.difficulty}
                </span>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-muted)' }}>{mod.description}</p>
                <div className="flex items-center justify-between text-xs font-cinzel" style={{ color: 'var(--ink-muted)' }}>
                  <span>{mod.lessonCount} Lessons</span>
                  <div className="flex-1 mx-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,148,58,0.2)' }}>
                    <div className="h-full rounded-full" style={{ width: `${mod.progress}%`, background: 'linear-gradient(90deg, var(--saffron), var(--gold))' }} />
                  </div>
                  <span style={{ color: 'var(--gold)' }}>+{mod.xpReward} XP</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="tag-pill">🎮 Gamification</span>
          <h2 className="font-cormorant text-4xl font-semibold mt-4 mb-3">Your Sacred Journey</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: '🔥', title: 'Daily Streaks', desc: 'Build an unbreakable devotion practice — one day at a time' },
            { icon: '✨', title: 'XP & Levels', desc: 'Rise from Seeker to Guru as your wisdom deepens' },
            { icon: '🏆', title: 'Leaderboards', desc: 'Compete with seekers globally, weekly, and monthly' },
            { icon: '💎', title: 'Sacred Badges', desc: 'Unlock Bronze, Silver, Gold & Diamond achievements' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-xl p-5 text-center"
              style={{ border: '1px solid rgba(201,148,58,0.2)' }}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-cinzel font-semibold text-sm mb-2">{f.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="text-center py-10 px-6" style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.55)' }}>
        <div className="font-cinzel text-lg mb-2" style={{ color: 'var(--gold-light)' }}>🪷 Daily Shastra Quiz</div>
        <p className="text-sm">Built with devotion · Jai Shri Krishna · © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

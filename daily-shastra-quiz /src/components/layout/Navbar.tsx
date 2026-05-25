'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/hooks/useUser';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, levelInfo } = useUser();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-16"
      style={{
        background: 'rgba(253,246,227,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,148,58,0.3)',
      }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="text-2xl">🪷</span>
        <span className="font-cinzel font-semibold text-base tracking-wide"
          style={{ color: 'var(--saffron-deep)' }}>
          Daily Shastra Quiz
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-1">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}
            className="px-4 py-2 rounded-full text-sm font-crimson transition-all duration-200 no-underline"
            style={{
              color: pathname === href ? 'var(--saffron-deep)' : 'var(--ink-muted)',
              background: pathname === href ? 'rgba(232,131,42,0.12)' : 'transparent',
            }}>
            {label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <div className="streak-pill hidden sm:flex">🔥 {user.streak}</div>
            <div className="xp-pill hidden sm:flex">✨ {user.xp.toLocaleString()} XP</div>
            <Link href="/profile">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, var(--saffron), var(--gold))',
                  border: '2px solid var(--gold-light)',
                }}>
                {user.username[0]?.toUpperCase() || 'A'}
              </div>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <button className="btn-primary text-sm py-2 px-5">Start Learning</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

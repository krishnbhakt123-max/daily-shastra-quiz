'use client';

import { useEffect, useState } from 'react';

type Piece = {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  isCircle: boolean;
};

const COLORS = ['#E8832A','#C9943A','#F0C060','#8B2252','#1A6B6B','#FF6B35','#F4A84B'];

export default function Confetti({ active }: { active: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const arr: Piece[] = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 2,
      duration: 2.5 + Math.random() * 2,
      size: 6 + Math.random() * 8,
      isCircle: Math.random() > 0.5,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  if (!pieces.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: '-20px',
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: p.color,
          borderRadius: p.isCircle ? '50%' : '2px',
          animation: `confettiFall ${p.duration}s ${p.delay}s linear forwards`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

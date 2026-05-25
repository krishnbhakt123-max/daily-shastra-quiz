'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useQuiz } from '@/hooks/useQuiz';
import { useUser } from '@/hooks/useUser';
import Confetti from '@/components/gamification/Confetti';
import type { Question } from '@/lib/questions';

export default function QuizEngine({
  questions,
  lessonTitle,
  lessonId,
  onComplete,
}: {
  questions: Question[];
  lessonTitle: string;
  lessonId: string;
  onComplete?: (result: { score: number; total: number; xpEarned: number }) => void;
}) {
  const quiz = useQuiz(questions);
  const { completeQuiz } = useUser();
  const [submitted, setSubmitted] = useState(false);

  function handleStart() { quiz.startQuiz(); }

  function handleSelect(i: number) { quiz.selectAnswer(i); }

  function handleNext() {
    // Submit to Google Sheets if user is logged in
    if (quiz.isLastQuestion && quiz.state === 'answered' && user.username) {
      const s = quiz.score + (quiz.selectedAnswer === quiz.currentQuestion?.correctIndex ? 1 : 0);
      api.submitQuiz({ username: user.username, lessonId, score: s, total: quiz.totalQuestions }).catch(() => {});
    }
    if (quiz.isLastQuestion && quiz.state === 'answered') {
      quiz.nextQuestion();
      if (quiz.result) {
        completeQuiz(lessonId, quiz.result.isPerfect, quiz.result.xpEarned);
        onComplete?.(quiz.result);
        setSubmitted(true);
      }
    } else {
      quiz.nextQuestion();
    }
  }

  // Idle / start screen
  if (quiz.state === 'idle') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">📿</div>
        <h1 className="font-cormorant text-4xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
          {lessonTitle}
        </h1>
        <p className="text-lg mb-2" style={{ color: 'var(--ink-muted)' }}>
          {questions.length} questions · Earn up to {questions.length * 20 + 100} XP
        </p>
        <p className="text-base italic mb-10" style={{ color: 'var(--ink-muted)' }}>
          "The soul who meditates on the Self is content to serve the Self and rests satisfied within the Self; there remains nothing unattained." — Gita 3.17
        </p>
        <button className="btn-primary text-lg px-10 py-4" onClick={handleStart}>
          🕉 Begin Quiz
        </button>
      </div>
    );
  }

  // Complete screen
  if (quiz.state === 'complete' && quiz.result) {
    const { score, total, xpEarned, accuracy, isPerfect } = quiz.result;
    const pct = Math.round((score / total) * 100);
    return (
      <>
        <Confetti active={isPerfect} />
        <div className="max-w-xl mx-auto px-4 py-12 text-center">
          <div className="text-7xl mb-4" style={{ animation: 'bounceIn 0.6s ease' }}>
            {isPerfect ? '🏆' : score >= Math.ceil(total * 0.6) ? '⭐' : '📖'}
          </div>
          <h2 className="font-cormorant text-4xl font-bold mb-2" style={{ color: 'var(--saffron-deep)' }}>
            {isPerfect ? 'Perfect Score!' : score >= Math.ceil(total * 0.6) ? 'Well Done!' : 'Keep Practising'}
          </h2>
          <p className="text-lg mb-6" style={{ color: 'var(--ink-muted)' }}>
            {isPerfect
              ? 'You have absorbed this wisdom deeply. Jai Shri Krishna! 🙏'
              : 'Every step on the path brings you closer to the light.'}
          </p>

          {/* Score circle */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(201,148,58,0.15)" strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none"
                stroke="var(--saffron)" strokeWidth="10"
                strokeDasharray={`${(pct / 100) * 326} 326`}
                strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-cinzel text-2xl font-bold" style={{ color: 'var(--saffron-deep)' }}>{pct}%</span>
              <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>{score}/{total}</span>
            </div>
          </div>

          {/* XP gained */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-cinzel font-bold text-xl mb-8"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))' }}>
            ✨ +{xpEarned} XP Earned{isPerfect ? ' · Perfect Bonus!' : ''}
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button className="btn-secondary" onClick={quiz.resetQuiz}>🔄 Try Again</button>
            <a href="/dashboard"><button className="btn-primary">📊 View Progress</button></a>
          </div>

          {isPerfect && (
            <p className="mt-6 font-cinzel text-sm tracking-widest" style={{ color: 'var(--saffron-deep)' }}>
              🎉 PERFECT SCORE BADGE UNLOCKED!
            </p>
          )}
        </div>
        <style>{`@keyframes bounceIn{0%{transform:scale(0.3);opacity:0}50%{transform:scale(1.1)}70%{transform:scale(0.9)}100%{transform:scale(1);opacity:1}}`}</style>
      </>
    );
  }

  // Active quiz
  const q = quiz.currentQuestion;
  if (!q) return null;
  const answered = quiz.state === 'answered';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="font-cinzel text-xs tracking-widest mb-3" style={{ color: 'var(--saffron)', textTransform: 'uppercase' }}>
          🪷 {lessonTitle}
        </div>
        <div className="h-2 rounded-full mb-2 overflow-hidden" style={{ background: 'rgba(201,148,58,0.2)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${quiz.progress}%`, background: 'linear-gradient(90deg, var(--saffron), var(--gold))' }} />
        </div>
        <div className="font-cinzel text-sm" style={{ color: 'var(--ink-muted)' }}>
          Question {quiz.currentIndex + 1} of {quiz.totalQuestions}
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl p-8 text-center mb-4"
        style={{ border: '1px solid rgba(201,148,58,0.25)', boxShadow: '0 4px 20px rgba(26,18,10,0.1)' }}>
        <div className="text-5xl mb-5">{q.icon}</div>
        <h2 className="font-cormorant text-2xl font-semibold leading-snug mb-2" style={{ color: 'var(--ink)' }}>
          {q.question}
        </h2>
        <p className="text-sm italic" style={{ color: 'var(--ink-muted)' }}>{q.context}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {q.options.map((opt, i) => {
          let extraClass = '';
          if (answered) {
            if (i === q.correctIndex) extraClass = 'correct';
            else if (i === quiz.selectedAnswer) extraClass = 'wrong';
          }
          return (
            <button key={i}
              className={`option-btn ${extraClass}`}
              onClick={() => handleSelect(i)}
              disabled={answered}>
              <span className="font-cinzel text-xs font-bold mr-2" style={{ color: 'var(--saffron)' }}>
                {'ABCD'[i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div className="rounded-xl p-4 mb-4 flex items-start gap-3"
          style={{
            animation: 'slideUp 0.3s ease',
            background: quiz.selectedAnswer === q.correctIndex
              ? 'rgba(46,158,158,0.1)' : 'rgba(204,68,85,0.08)',
            border: `1px solid ${quiz.selectedAnswer === q.correctIndex
              ? 'rgba(46,158,158,0.3)' : 'rgba(204,68,85,0.25)'}`,
          }}>
          <span className="text-2xl flex-shrink-0">
            {quiz.selectedAnswer === q.correctIndex ? '✅' : '❌'}
          </span>
          <div>
            <div className="font-cinzel text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>
              {quiz.selectedAnswer === q.correctIndex ? '🎉 Correct! +20 XP' : 'Not quite...'}
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--ink-muted)' }}>
              {q.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Next button */}
      <button className="btn-primary w-full py-4 text-base"
        onClick={handleNext}
        disabled={!answered}
        style={{ opacity: answered ? 1 : 0.4 }}>
        {quiz.isLastQuestion ? 'See Results 🏆' : 'Continue →'}
      </button>

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

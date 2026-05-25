'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import QuizEngine from '@/components/quiz/QuizEngine';
import { MODULES, getQuestionsForLesson, getRandomQuestions } from '@/lib/questions';
import { api, RemoteQuestion } from '@/lib/api';
import type { Question } from '@/lib/questions';
import Link from 'next/link';

function remoteToLocal(q: RemoteQuestion, i: number): Question {
  return {
    id: `remote-${i}`,
    lessonId: q.lessonId,
    module: q.lessonId,
    question: q.question,
    icon: '📖',
    context: q.lessonId.replace(/-/g, ' '),
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    difficulty: (q.difficulty as Question['difficulty']) || 'beginner',
    xpReward: 20,
  };
}

function QuizContent() {
  const params = useSearchParams();
  const lessonId = params.get('lesson');
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState<'remote' | 'local'>('local');

  useEffect(() => {
    if (!lessonId) return;
    setLoading(true);

    api.getQuestions(lessonId)
      .then(({ questions: remote }) => {
        if (remote.length > 0) {
          setQuestions(remote.map(remoteToLocal));
          setSource('remote');
        } else {
          // Fallback to local questions if sheet is empty
          loadLocal();
        }
      })
      .catch(() => loadLocal())
      .finally(() => setLoading(false));

    function loadLocal() {
      const local = lessonId === 'random'
        ? getRandomQuestions(5)
        : getQuestionsForLesson(lessonId!).length > 0
          ? getQuestionsForLesson(lessonId!)
          : getRandomQuestions(5);
      setQuestions(local);
      setSource('local');
    }
  }, [lessonId]);

  if (!lessonId) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <span className="tag-pill">🎯 Choose Your Path</span>
          <h1 className="font-cormorant text-4xl font-bold mt-4 mb-3">Select a Lesson</h1>
          <p className="text-lg font-light" style={{ color: 'var(--ink-muted)' }}>Which sacred topic calls to you today?</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map(mod => (
            <Link key={mod.id} href={`/quiz?lesson=${mod.id}`} className="no-underline">
              <div className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid rgba(201,148,58,0.25)' }}>
                <div className="text-3xl mb-2">{mod.icon}</div>
                <div className="font-cinzel font-semibold mb-1">{mod.title}</div>
                <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>{mod.lessonCount} lessons · +{mod.xpReward} XP</p>
              </div>
            </Link>
          ))}
          <Link href="/quiz?lesson=random" className="no-underline">
            <div className="bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              style={{ border: '2px dashed rgba(201,148,58,0.4)' }}>
              <div className="text-3xl mb-2">🎲</div>
              <div className="font-cinzel font-semibold mb-1">Daily Challenge</div>
              <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>Mixed topics · +75 XP bonus</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !questions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="text-5xl animate-float">🕉</div>
        <p className="font-cinzel tracking-widest text-sm" style={{ color: 'var(--saffron)' }}>
          Loading sacred questions...
        </p>
      </div>
    );
  }

  const module = MODULES.find(m => m.id === lessonId);

  return (
    <div className="min-h-screen py-8" style={{
      background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,131,42,0.08) 0%, transparent 60%), var(--parchment)',
    }}>
      {source === 'remote' && (
        <div className="text-center mb-2">
          <span className="tag-pill text-xs">✨ Live questions from Google Sheets</span>
        </div>
      )}
      <QuizEngine
        questions={questions}
        lessonTitle={lessonId === 'random' ? 'Daily Challenge' : (module?.title ?? 'Vedic Wisdom Quiz')}
        lessonId={lessonId}
      />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-5xl animate-float">🕉</div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}

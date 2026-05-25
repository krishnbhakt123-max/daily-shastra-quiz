'use client';

import { useState, useCallback } from 'react';
import type { Question } from '@/lib/questions';
import { calculateQuizXP } from '@/lib/xp';

type QuizState = 'idle' | 'active' | 'answered' | 'complete';

type QuizResult = {
  score: number;
  total: number;
  xpEarned: number;
  accuracy: number;
  isPerfect: boolean;
  answers: number[];
};

export function useQuiz(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<QuizState>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = ((currentIndex) / questions.length) * 100;

  const startQuiz = useCallback(() => {
    setState('active');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setResult(null);
  }, []);

  const selectAnswer = useCallback(
    (index: number) => {
      if (state !== 'active') return;

      setSelectedAnswer(index);
      setState('answered');

      const isCorrect = index === currentQuestion.correctIndex;
      const newAnswers = [...answers, index];
      setAnswers(newAnswers);

      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    },
    [state, currentQuestion, answers]
  );

  const nextQuestion = useCallback(() => {
    if (isLastQuestion) {
      const finalScore = score + (selectedAnswer === currentQuestion?.correctIndex ? 1 : 0);
      // Count including current answer
      const answeredCorrectly = answers.filter(
        (a, i) => a === questions[i].correctIndex
      ).length;

      const xpEarned = calculateQuizXP(answeredCorrectly, questions.length);
      const accuracy = Math.round((answeredCorrectly / questions.length) * 100);

      setResult({
        score: answeredCorrectly,
        total: questions.length,
        xpEarned,
        accuracy,
        isPerfect: answeredCorrectly === questions.length,
        answers,
      });
      setState('complete');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setState('active');
    }
  }, [isLastQuestion, score, selectedAnswer, currentQuestion, answers, questions]);

  const resetQuiz = useCallback(() => {
    setState('idle');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setScore(0);
    setResult(null);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    state,
    selectedAnswer,
    score,
    progress,
    result,
    isLastQuestion,
    totalQuestions: questions.length,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
  };
}

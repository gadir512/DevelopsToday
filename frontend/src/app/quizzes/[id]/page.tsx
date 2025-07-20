'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchQuizById } from '@/services/quizService';
import QuizQuestion from '@/components/QuizQuestion';

interface Question {
  id: number;
  questionText: string;
  questionType: string;
}

interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export default function QuizDetailPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        const data = await fetchQuizById(id as string);
        setQuiz(data);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <p className="text-center text-gray-700">Loading quiz...</p>;
  if (!quiz) return <p className="text-center text-red-600">Quiz not found inn the db.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-black">Quiz Title: {quiz.title}</h1>

      {quiz.questions.length === 0 ? (
        <p className="text-gray-500 italic">No questions available.</p>
      ) : (
        <ul className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <QuizQuestion
              key={q.id}
              index={idx}
              questionText={q.questionText}
              questionType={q.questionType}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

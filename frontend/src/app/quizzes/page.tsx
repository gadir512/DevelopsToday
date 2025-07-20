'use client';

import { useEffect, useState } from 'react';
import { fetchQuizzes, deleteQuiz } from '@/services/quizService';
import QuizItem from '@/components/QuizItem';

interface Quiz {
  id: number;
  title: string;
  questionCount: number;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data.quizzes || []);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this quiz?');
    if (!confirmed) return;

    try {
      await deleteQuiz(id);
      setQuizzes(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
      alert('Failed to delete quiz');
    }
  };

  if (loading) return <p className="text-gray-600">Loading quizzes...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">All Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes found.</p>
      ) : (
        <ul className="space-y-4">
          {quizzes.map((quiz) => (
            <QuizItem
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionCount={quiz.questionCount}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

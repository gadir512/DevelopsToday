'use client';

import Link from 'next/link';

interface Props {
  id: number;
  title: string;
  questionCount: number;
  onDelete: (id: number) => void;
}

export default function QuizItem({ id, title, questionCount, onDelete }: Props) {
  return (
    <li
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <span className="text-black font-semibold ">Title:</span>
        <Link href={`/quizzes/${id}`} className="text-lg text-blue-600 hover:underline">
          {title}
        </Link>
        
      </div>

      <button
        onClick={() => onDelete(id)}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
      >
        Delete
      </button>
    </li>
  );
}

'use client';

import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Quiz Platform</h1>

      <Link href="/quizzes">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg shadow-md transition">
          View All Quizzes
        </button>
      </Link>
       <Link href="/create">
        <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded-lg shadow-md transition">
          Create Quizzes
        </button>
      </Link>
    </div>
  );
}

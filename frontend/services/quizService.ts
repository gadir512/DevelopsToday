const BASE_URL = process.env.API_BASE_URL;

export async function fetchQuizzes() {
  const res = await fetch(`${BASE_URL}/quizzes`);
  if (!res.ok) throw new Error('Failed to fetch quizzes');
  return res.json();
}

export async function deleteQuiz(id: number) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete quiz');
  return true;
}

export async function fetchQuizById(id: string | number) {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
}

export async function createQuiz(data: any) {
  const res = await fetch(`${BASE_URL}/quizzes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create quiz');
  return await res.json();
}

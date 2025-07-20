export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id?: number;
  questionText: string;
  type: QuestionType;
  options?: string[];  
}

export interface Quiz {
  id?: number;
  title: string;
  questions: Question[];
}

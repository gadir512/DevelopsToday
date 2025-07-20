'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import styles from './CreateQuizForm.module.css';  
import { createQuiz } from '@/services/quizService';

const questionSchema = z.object({
  questionText: z.string().min(1, 'Question text is required'),
  type: z.enum(['boolean', 'input', 'checkbox']),
  options: z.array(z.string()).optional(),
});

const formSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Add at least one question'),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateQuizForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { questions: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createQuiz(data);
      alert('Quiz created!');
    } catch (error) {
      console.error(error);
      alert('Failed to create quiz');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Create a New Quiz</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Quiz Title</label>
          <input
            {...register('title')}
            placeholder="Enter quiz title..."
            className={styles.input}
          />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className={styles.questionCard}>
            <h3 className="text-black">Question {index + 1}:</h3>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Question Text</label>
              <input
                {...register(`questions.${index}.questionText` as const)}
                className={styles.input}
                placeholder="Enter question text"
              />
              {errors.questions?.[index]?.questionText && (
                <p className={styles.error}>{errors.questions[index]?.questionText?.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Type</label>
              <select {...register(`questions.${index}.type` as const)} className={styles.select}>
                <option value="boolean">Boolean (True/False)</option>
                <option value="input">Input (Short answer)</option>
                <option value="checkbox">Checkbox (Multiple choice)</option>
              </select>
            </div>

            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(index)}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          className={styles.addBtn}
          onClick={() => append({ questionText: '', type: 'boolean' })}
        >
          + Add Question
        </button>

        <button type="submit" className={styles.submitBtn}>Create Quiz</button>
      </form>
    </div>
  );
}

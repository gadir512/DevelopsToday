import { Request, Response } from 'express';
import { Quiz, Question, QuestionOption } from '../../models';

export async function createQuiz(req: Request, res: Response) {
  try {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const quiz = await Quiz.create({ title });

    for (const q of questions) {
      const question = await Question.create({
        quizId: quiz.id,
        questionText: q.questionText,
        questionType: q.type,
      });

      if (q.type === 'checkbox' && Array.isArray(q.options)) {
        const optionsToCreate = q.options.map((opt: string) => ({
          questionId: question.id,
          optionText: opt,
        }));
        await QuestionOption.bulkCreate(optionsToCreate);
      }
    }

    res.status(201).json({ message: 'Quiz created', quizId: quiz.id });
  } catch (error) {
    console.error('POST /quizzes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getAllQuizzes(req: Request, res: Response) {
  try {
    const result = await Quiz.findAll();
    const quizzes = result.map((quiz) => quiz.toJSON());
    res.json({ quizzes });
  } catch (error) {
    console.error('GET /quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
}

export async function getQuizById(req: Request, res: Response) {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [{
        model: Question,
        as: 'questions',
        include: [{ model: QuestionOption, as: 'options' }],
      }],
    });

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    console.error('GET /quizzes/:id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function deleteQuiz(req: Request, res: Response) {
  try {
    const deleted = await Quiz.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error('DELETE /quizzes/:id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

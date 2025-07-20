import Quiz from './Quiz';
import Question from './Question';
import QuestionOption from './QuestionOption';

Quiz.hasMany(Question, { foreignKey: 'quizId', as: 'questions', onDelete: 'CASCADE' });
Question.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

Question.hasMany(QuestionOption, { foreignKey: 'questionId', as: 'options', onDelete: 'CASCADE' });
QuestionOption.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });

export {
  Quiz,
  Question,
  QuestionOption,
};

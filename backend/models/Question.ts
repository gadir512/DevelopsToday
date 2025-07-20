import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../src/config/database';

interface QuestionAttributes {
  id: number;
  quizId: number;
  questionText: string;
  questionType: 'boolean' | 'input' | 'checkbox';
}


interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
  public id!: number;
  public quizId!: number;
  public questionText!: string;
  public questionType!: 'boolean' | 'input' | 'checkbox';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionType: {
    type: DataTypes.ENUM('boolean', 'input', 'checkbox'),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'questions',
  timestamps: true,
});

export default Question;

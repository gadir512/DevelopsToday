import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../src/config/database';
import Question from './Question';


interface QuizAttributes {
  id: number;
  title: string;
}

interface QuizCreationAttributes extends Optional<QuizAttributes, 'id'> {}

class Quiz extends Model<QuizAttributes, QuizCreationAttributes> implements QuizAttributes {
  public id!: number;
  public title!: string;
public readonly questions?: Question[]; 

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quiz.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'quizzes',
  timestamps: true,
});

export default Quiz;

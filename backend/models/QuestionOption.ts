import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../src/config/database';

interface QuestionOptionAttributes {
  id: number;
  questionId: number;
  optionText: string;
}

interface QuestionOptionCreationAttributes extends Optional<QuestionOptionAttributes, 'id'> {}

class QuestionOption extends Model<QuestionOptionAttributes, QuestionOptionCreationAttributes> implements QuestionOptionAttributes {
  public id!: number;
  public questionId!: number;
  public optionText!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuestionOption.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  optionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'question_options',
  timestamps: true,
});

export default QuestionOption;

import sequelize from '../config/database';
import Quiz from '../../models/Quiz';
import Question from '../../models/Question';
import QuestionOption from '../../models/QuestionOption';


async function syncDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); 
    console.log('Database synced successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
}

syncDb();

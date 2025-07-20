import express from 'express';
import cors from 'cors';
import quizRoutes from './routes/quizRoutes';
import sequelize from './config/database';
import '../models'; 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('Running'));

app.use('/quizzes', quizRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); 
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
}

start();

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import db from '../src/config/db.js';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import animalRoutes from './routes/animal.routes.js';

const app = express(); //pour utiliser express

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); //lis les données JSON

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);

app.use(errorHandler); // Gestionnaire d'erreurs

export default app;

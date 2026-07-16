import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from './routes/auth.routes.js';
import animalRoutes from './routes/animal.routes.js';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json()); // Lis les données JSON

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);

app.use(errorHandler); // Gestionnaire d'erreurs

export default app;

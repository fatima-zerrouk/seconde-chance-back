import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from '../src/config/db.js';
import errorHandler from './middlewares/errorHandler.js';
// importer les routes au fur et à mesure

const app = express(); //pour utiliser express
const PORT = process.env.PORT;

// Middlewares globaux
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json()); //lis les données JSON

// app.use('/api/auth', authRoutes);
// brancher les autres routes ici

app.use(errorHandler); // Gestionnaire d'erreurs

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

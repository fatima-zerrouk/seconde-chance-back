import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError.js';

// Vérifie qui est l'utilisateur et si JWT est valide
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Vérifie qu'il existe et commence par Bearer
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AppError('Accès non autorisé aucun token fourni', 401);
  }
  const token = authHeader.split(' ')[1]; //extrait le token coupe la chaîne après bearer

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocke le payload décodé {id, email, role} dans req.user
    next();
  } catch {
    // Si token est expiré ou corrompu, lance une erreur
    next(new AppError('Session expirée ou token invalide', 401));
  }
};

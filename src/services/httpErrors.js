import AppError from '../errors/AppError.js';

// throw new AppError('Requête invalide', 400);
throw new AppError('Accès non autorisé', 401);
throw new AppError('Ressource introuvable', 404);

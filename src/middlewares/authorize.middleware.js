import AppError from '../errors/AppError.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Vérifie si req.user existe (authenticate doit être passé avant)
    // Vérifie si le rôle de l'utilisateur est dans la liste autorisée
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError('Accès interdit', 403);
    }
    next();
  };
};

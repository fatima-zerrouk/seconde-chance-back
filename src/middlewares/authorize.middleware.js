import AppError from '../errors/AppError.js';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    //code factorisé pour éviter répétition
    //1 Vérifie si req.user existe (authenticate doit être passé avant)
    //2 Vérifie si le rôle de l'utilisateur est dans la liste autorisée
    if (!req.user || !allowedRoles.includes(req.user.roles)) {
      throw new AppError('Accès interdit', 403);
    }
    next();
  };
};

import AppError from '../errors/AppError.js';

// errorHandler reçoit les erreurs personnalisées ou non et les renvoie
const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  console.error(err.stack);
  res.status(500).json({
    message: 'Erreur serveur interne',
  });
};

export default errorHandler;

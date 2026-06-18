// import multer from 'multer';
import AppError from '../errors/AppError.js';

// errorHandler reçoit les erreurs personnalisées ou non et les renvoie
const errorHandler = (err, req, res, next) => {
  //express reconnaît un middleware d’erreur avec 4 paramètres obligatoire
  if (err instanceof AppError) {
    //si l'erreur est une erreur personnalisée de AppError
    return res.status(err.statusCode).json({
      // renvoie le code d'erreur et le message
      message: err.message,
    });
  }
  // sinon erreur inconnue ou serveur erreur 500
  console.error(err.stack); //affiche dans la console
  res.status(500).json({
    message: 'Erreur serveur interne',
  });
};

export default errorHandler;

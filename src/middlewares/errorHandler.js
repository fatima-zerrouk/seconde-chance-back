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
  // // VERSION 2 KITI gestion multer error (pourquoi mettre errer personaliser ici ai lieu de upload )
  // if (err instanceof multer.MulterError) {

  //   if (err.code === 'LIMIT_FILE_SIZE') {

  //     return res.status(400).json({
  //       message: 'Fichier trop lourd (5 Mo maximum)',
  //     });

  //   }

  // }
  // sinon erreur inconnue ou serveur erreur 500
  console.error(err.stack); //affiche dans la console
  res.status(500).json({
    message: 'Erreur serveur interne',
  });
};

export default errorHandler;

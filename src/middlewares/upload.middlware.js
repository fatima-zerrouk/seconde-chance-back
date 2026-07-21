import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import AppError from '../errors/AppError.js';

cloudinary.config({
  cloudinary_api_url: process.env.CLOUDINARY_URL,
});

const storage = multer.memoryStorage(); //Multer garde temporairement le fichier puis l'envoi à cloudinary

// Filtre le format
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    // Erreur de format transmise à Multer
    const error = new Error('Format invalide. Autorisé : JPG, PNG, WEBP back');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

// Crée l'instance Multer en local temporairement
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
}).single('image'); // Attend la clé 'image' du formData en front

// Vérifie taille/format
export const uploadMiddleware = (req, res, next) => {
  upload(req, res, err => {
    // Si Multer a rencontré une erreur pendant l'analyse du fichier
    if (err) {
      // Attrape le code de taille de Multer
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError('Fichier trop lourd (5 Mo maximum)', 400));
      }

      // Si c'est l'erreur de format venant de fileFilter
      if (err.code === 'LIMIT_FILE_TYPES') {
        return next(new AppError(err.message, 400));
      }

      // Pour toute autre erreur inconnue de Multer
      return next(new AppError(err.message, 400));
    }

    // Vérifie qu'un fichier existe
    if (!req.file) {
      return next(new AppError('Aucun fichier reçu', 400));
    }

    next();
  });
};

// Fonction d'envoi vers Cloudinary avec optimisation automatique
export const uploadToCloudinary = fileBuffer => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'seconde-chance', // Nom du dossier Cloudinary
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Retourne l'URL sécurisée
      }
    );
    stream.end(fileBuffer);
  });
};

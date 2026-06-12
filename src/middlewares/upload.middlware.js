import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import AppError from '../errors/AppError.js';
// Le middlware vérifie les fichiers avant le contrôleur

const storage = multer.memoryStorage(); //Multer garde temporairement le fichier puis l'envoi à cloudinary

// Vérifie le format du fichier
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo maximum
  fileFilter,
}).single('image'); // Attend la clé 'image' du formData en front

// Middleware qu'Express va exécuter vérifie taille/format
export const uploadMiddleware = (req, res, next) => {
  upload(req, res, err => {
    // Si Multer a rencontré une erreur pendant l'analyse du fichier
    if (err) {
      // Attrape le code de taille de Multer
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(
          new AppError('Fichier trop lourd (5 Mo maximum) back', 400)
        );
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
      return next(new AppError('Aucun fichier reçu back', 400));
    }

    // Tout est ok, passe au contrôleur
    next();
  });
};

// Fonction d'envoi vers Cloudinary avec optimisation automatique
export const uploadToCloudinary = fileBuffer => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'seconde-chance', // Nom du dossier Cloudinary
        transformation: [{ quality: 'auto', fetch_format: 'auto' }], // Optimisation choisit automatiquement meilleure qualité/format
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Retourne que l'URL sécurisée
      }
    );
    stream.end(fileBuffer);
  });
};

// VERSION 3
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Stockage temporaire en mémoire vive (RAM)
const storage = multer.memoryStorage();

// Filtre de validation (JPG, PNG, WEBP, 5Mo max)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    const error = new Error('Format invalide. Autorisé : JPG, PNG, WEBP');
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo maximum
  fileFilter,
});

// Fonction utilitaire d'envoi vers Cloudinary avec OPTIMISATION AUTOMATIQUE
export const uploadToCloudinary = fileBuffer => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'seconde-chance', // Nom du dossier Cloudinary
        transformation: [{ quality: 'auto', fetch_format: 'auto' }], // Optimisation
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Retourne que l'URL sécurisée
      }
    );
    stream.end(fileBuffer);
  });
};

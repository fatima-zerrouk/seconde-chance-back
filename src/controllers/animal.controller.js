import * as AnimalServices from '../services/animal.services.js';
import * as uploadHelper from '../middlewares/upload.middlware.js';
// Le controller reçoit la requête HTTP et renvoyer une réponse HTTP

// Création de l'animal complet
export const createAnimal = async (req, res, next) => {
  try {
    // req.body contient les données du envoyées du front : { name, gender, age, size, description, status, is_visible, id_breed, url }
    const animal = await AnimalServices.createAnimal(req.body);

    // Renvoie l'animal créé avec un statut 201
    return res.status(201).json(animal);
  } catch (error) {
    console.error("Erreur lors de la création de l'animal:", error);
    // Transmet l'erreur au middleware errorHandler
    next(error);
  }
};

//  Upload de l'image seule vers Cloudinary (appelé en premier par le drag & drop)
export const uploadImage = async (req, res, next) => {
  try {
    // Envoie le fichier vers Cloudinary
    const imageUrl = await uploadHelper.uploadToCloudinary(req.file.buffer);

    // Renvoie uniquement l'URL
    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Erreur dans uploadImage:', error);
    next(error);
  }
};

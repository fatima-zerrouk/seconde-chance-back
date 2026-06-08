import * as AnimalServices from '../services/animal.services.js';
import * as uploadHelper from '../middlewares/upload.middlware.js';

// Création de l'animal complet
export const createAnimal = async (req, res, next) => {
  try {
    // req.body contient : { name, gender, age, size, description, status, is_visible, id_breed, url }
    const animal = await AnimalServices.createAnimal(req.body);

    // Renvoie l'animal créé au Front avec un statut 201
    return res.status(201).json(animal);
  } catch (error) {
    console.error("Erreur lors de la création de l'animal:", error);
    next(error);
  }
};

//  Upload de l'image seule vers Cloudinary (Appelé en premier par le Drag & Drop)
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Le serveur n'a reçu aucun fichier sous la clé 'image'.",
      });
    }

    // Envoi du buffer à Cloudinary
    const imageUrl = await uploadHelper.uploadToCloudinary(req.file.buffer);

    // Renvoie l'URL générée au Front
    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error('Erreur dans uploadImage:', error);
    next(error);
  }
};

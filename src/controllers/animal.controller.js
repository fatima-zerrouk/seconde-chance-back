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

// Récupération d'un animal par son ID
export const getAnimalById = async (req, res, next) => {
  try {
    const { id } = req.params; // Récupère l'id de l'animal depuis les paramètres de la requête l'URL (ex: /api/animals/42)
    const animal = await AnimalServices.getAnimalById(id); // Appelle le service pour récupérer l'animal

    if (!animal) {
      // Si l'animal n'existe pas, renvoie une erreur 404
      return res.status(404).json({ message: 'Animal non trouvé' });
    }
    return res.status(200).json(animal); // Renvoie l'animal trouvé avec un statut 200
  } catch (error) {
    //
    console.error("Erreur lors de la récupération de l'animal", error); // Log l'erreur
    next(error); // Transmet l'erreur au middleware errorHandler pour une gestion centralisée
  }
};

// Mettre à jour un animal complet
export const updateAnimal = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Appelle le service pour mettre à jour l'animal avec les données du corps de la requête
    const updatedAnimal = await AnimalServices.updateAnimal(id, req.body);

    return res.status(200).json(updatedAnimal);
  } catch (error) {
    console.error("Erreur lors de la modification de l'animal:", error);
    next(error);
  }
};

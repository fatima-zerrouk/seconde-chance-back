import * as AnimalServices from '../services/animal.services.js';
import * as uploadHelper from '../middlewares/upload.middlware.js';

// Récupérer la liste des animaux (avec pagination et recherche)
export const getAllAnimals = async (req, res) => {
  // Extrait les variables de req.query
  const { page, limit, search } = req.query;

  // Appelle service en lui passant ces données
  // Force la conversion en nombres pour page et limit évite les bugs car req.query donne toujours des chaînes de caractères (strings)
  const result = await AnimalServices.getAllAnimals({
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 9,
    search: search || '',
  });

  // Renvoie le résultat au front
  return res.status(200).json(result);
};

// Création de l'animal complet
export const createAnimal = async (req, res) => {
  // Si createAnimal jette une erreur, Express 5 l'envoie directement au errorHandler
  const animal = await AnimalServices.createAnimal(req.body);
  return res.status(201).json(animal);
};

// Upload de l'image seule vers Cloudinary (drag & drop)
export const uploadImage = async (req, res) => {
  const imageUrl = await uploadHelper.uploadToCloudinary(req.file.buffer);
  return res.status(200).json({ url: imageUrl });
};

// Récupération d'un animal par son ID
export const getAnimalById = async (req, res) => {
  const { id } = req.params;
  const animal = await AnimalServices.getAnimalById(id);
  return res.status(200).json(animal);
};

// Mettre à jour un animal complet
export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const updatedAnimal = await AnimalServices.updateAnimal(id, req.body);
  return res.status(200).json(updatedAnimal);
};

import * as AnimalServices from '../services/animal.services.js';
import * as uploadHelper from '../middlewares/upload.middlware.js';

// Récupérer la liste des animaux (pagination et recherche)
export const getAllAnimals = async (req, res) => {
  // Extrait les variables de req.query
  const { page, limit, search } = req.query;

  // Force la conversion en nombres page / limit
  const result = await AnimalServices.getAllAnimals({
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 9,
    search: search || '',
  });
  return res.status(200).json(result);
};

export const createAnimal = async (req, res) => {
  const animal = await AnimalServices.createAnimal(req.body);
  return res.status(201).json(animal);
};

export const uploadImage = async (req, res) => {
  const imageUrl = await uploadHelper.uploadToCloudinary(req.file.buffer);
  return res.status(200).json({ url: imageUrl });
};

export const getAnimalById = async (req, res) => {
  const { id } = req.params;
  const animal = await AnimalServices.getAnimalById(id);
  return res.status(200).json(animal);
};

export const updateAnimal = async (req, res) => {
  const { id } = req.params;
  const updatedAnimal = await AnimalServices.updateAnimal(id, req.body);
  return res.status(200).json(updatedAnimal);
};

export const updateAnimalStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updateAnimal = await AnimalServices.updateAnimalStatus(id, status);
  return res.status(200).json(updateAnimal);
};

export const deleteAnimal = async (req, res) => {
  const { id } = req.params;
  await AnimalServices.remove(id);
  return res.status(204).send();
};

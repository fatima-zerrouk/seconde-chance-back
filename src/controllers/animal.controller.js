import * as AnimalServices from '../services/animal.services.js';
import * as uploadHelper from '../middlewares/upload.middlware.js';

// Récupérer la liste des animaux (pagination et recherche)
export const getAllAnimals = async (req, res) => {
  const { page, limit, search, speciesId, breedId, gender, ageGroup } =
    req.query;

  const result = await AnimalServices.getAllAnimals({
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 9,
    search: search || '',
    speciesId: speciesId || null,
    breedId: breedId || null,
    gender: gender || null,
    ageGroup: ageGroup || null,
  });
  return res.status(200).json(result);
};

export const getBreedsBySpecies = async (req, res) => {
  const { speciesId } = req.query;
  const breeds = await AnimalServices.getBreedsBySpecies(speciesId);
  return res.status(200).json(breeds);
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

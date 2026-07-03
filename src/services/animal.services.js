import * as AnimalModel from '../model/animal.model.js';
import AppError from '../errors/AppError.js';

// Création de l'animal
export const createAnimal = async (data) => {
  const id = await AnimalModel.createWithPicture(data);
  const animal = await AnimalModel.findById(id);
  
  if (!animal) {
    throw new AppError("Erreur lors de la création de l'animal en base de données", 500);
  }
  return animal;
};

// Récupération d'un animal
export const getAnimalById = async (id) => {
  
  const animal = await AnimalModel.findById(id);
  
  // Si le modèle renvoie null, c'est que l'ID n'existe pas 
  if (!animal) {
    throw new AppError("Cet animal n'existe pas ou a été supprimé", 404);
  }
  return animal;
};

// Modification d'un animal 
export const updateAnimal = async (id, data) => {
  // Vérifie si l'animal existe avant de lancer l'update SQL
  const animalExists = await AnimalModel.findById(id);
  if (!animalExists) {
    throw new AppError("Impossible de modifier : cet animal n'existe pas", 404);
  }

  // Lance la mise à jour (qui utilise la transaction SQL)
  await AnimalModel.updateWithPicture(id, data);
  
  // Récupère et renvoie l'animal mis à jour
  return await AnimalModel.findById(id);
};
import * as AnimalModel from '../model/animal.model.js';
import AppError from '../errors/AppError.js';

// FAIRE GESTION ERRURS
export const getAllAnimals = async ({
  page,
  limit,
  search,
  speciesId,
  breedId,
  gender,
  ageGroup,
}) => {
  const { animals, total } = await AnimalModel.findAll({
    page,
    limit,
    search,
    speciesId,
    breedId,
    gender,
    ageGroup,
  });

  return {
    animals,
    total,
  };
};

export const getBreedsBySpecies = async speciesId => {
  return await AnimalModel.findBySpecies(speciesId);
};

export const createAnimal = async data => {
  const id = await AnimalModel.createWithPicture(data);
  const animal = await AnimalModel.findById(id);

  if (!animal) {
    throw new AppError(
      "Erreur lors de la création de l'animal en base de données",
      500
    );
  }
  return animal;
};

export const getAnimalById = async id => {
  const animal = await AnimalModel.findById(id);
  // Si le modèle renvoie null, c'est que l'ID n'existe pas
  if (!animal) {
    throw new AppError("Cet animal n'existe pas ou a été supprimé", 404);
  }
  return animal;
};

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

export const updateAnimalStatus = async (id, status) => {
  // Tente la mise à jour en BDD
  const affectedRows = await AnimalModel.updateStatus(id, status);
  // Si aucune ligne n'a été modifiée, c'est que l'ID n'existe pas
  if (affectedRows === 0) {
    throw new AppError("Cet animal n'existe pas", 404);
  }
  // Si ça marche, récupère l'animal mis à jour
  const updatedAnimal = await AnimalModel.findById(id);
  return updatedAnimal;
};

export const remove = async id => {
  const existingAnimal = await AnimalModel.findById(id);

  if (!existingAnimal) {
    throw new AppError("Cet animal n'existe pas ou a déjà été supprimé", 404);
  }

  const isDeleted = await AnimalModel.remove(id);
  if (!isDeleted) {
    throw new AppError("La suppression n'a pas abouti", 400);
  }
  return;
};

import * as AnimalModel from '../model/animal.model.js';
//Le service gère la logique métier, il fait le lien entre le controller et le model

export const createAnimal = async data => {
  // Demande au Model de créer l'animal et ses photos
  const id = await AnimalModel.createWithPicture(data);

  // Récupère l'animal complet
  return await AnimalModel.findById(id);
};

// Récupére un animal
export const getAnimalById = async id => {
  return await AnimalModel.findById(id);
};

// Service pour modifier un animal
export const updateAnimal = async (id, data) => {
  // Demande au Model de mettre à jour l'animal et ses photos
  await AnimalModel.updateWithPicture(id, data);

  // Récupère l'animal mis à jour pour le renvoyer au controller
  return await AnimalModel.findById(id);
};

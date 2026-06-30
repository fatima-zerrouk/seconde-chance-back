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
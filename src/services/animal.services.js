import * as AnimalModel from '../model/animal.model.js';

export const createAnimal = async data => {
  // Appelle la méthode avec la transaction (animal et photo)
  // data contient toutes les infos et .url
  const id = await AnimalModel.createWithPicture(data);

  // Cherche l'animal tout juste créé pour le renvoyer complet
  return await AnimalModel.findById(id);
};

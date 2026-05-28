import * as AnimalModel from '../model/animal.model.js';

export const createAnimal = async data => {
  const id = await AnimalModel.create(data);

  return await AnimalModel.findById(id);
};

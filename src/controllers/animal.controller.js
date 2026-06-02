import * as AnimalServices from '../services/animal.services.js';
import * as AnimalModel from '../model/animal.model.js';
export const createAnimal = async (req, res) => {
  const { name, gender, age, size, description, status, is_visible, id_breed } =
    req.body;

  const animal = await AnimalServices.createAnimal({
    name,
    gender,
    age,
    size,
    description,
    status,
    is_visible,
    id_breed,
  });
  return res.status(201).json(animal);
};

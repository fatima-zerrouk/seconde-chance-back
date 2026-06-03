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

// export const addAnimal = async (req, res, next) => {
//   try {
//     // req.body contient : { name, age, ..., image_url: "https://..." }
//     const newAnimalId = await AnimalModel.createAnimalWithPicture(req.body);

//     return res.status(201).json({
//       success: true,
//       message: 'Animal et photo enregistrés avec succès !',
//       animalId: newAnimalId,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

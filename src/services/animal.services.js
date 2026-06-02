import * as AnimalModel from '../model/animal.model.js';

export const createAnimal = async data => {
  const id = await AnimalModel.create(data);

  return await AnimalModel.findById(id);
};
// export const createAnimal = async data => {
//   try {
//     const result = await AnimalModel.create(data); //attend le résultat de l'insertion (qui contient l'insertId)

//     if (!result || !result.insertId) {
//       // Si la bdd n'a pas renvoyé d'id
//       throw new AppError("L'animal n'a pas pu être créé", 400);
//     }

//     return await AnimalModel.findById(result.insertId); //récupère l'animal fraîchement créé pour le renvoyer au contrôleur
//   } catch (error) {
//     if (error instanceof AppError) throw error;

//     if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.errno === 1452) {
//       throw new AppError("La race sélectionnée n'existe pas", 404);
//     }

//     throw error;
//   }
// };

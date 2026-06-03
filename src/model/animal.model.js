import pool from '../config/db.js';

// fonction qui
export const findById = async id => {
  const [rows] = await pool.execute('SELECT * FROM animals WHERE id = ?', [id]);

  return rows[0] ?? null;
};

// fonction qui
export const create = async ({
  // Objet unique en paramètre, l'ordre des arguments n'a plus d'importance
  name,
  gender,
  age,
  size,
  description,
  status,
  is_visible,
  id_breed,
}) => {
  //Je récupère les champs de ma table pour insérer les données
  const sql =
    'INSERT INTO animals (name, gender, age, size, description, status, is_visible, id_breed) VALUES (?, ?, ?, ?, ?, ?, ?,? )'; // requêtes préparées évite injections sql
  const [result] = await pool.execute(sql, [
    // execute plus sécurisé que query
    name,
    gender,
    age,
    size,
    description,
    status,
    is_visible,
    id_breed,
  ]);
  return result.insertId;
};

// export const createAnimalWithPicture = async animalData => {
//   const {
//     name,
//     gender,
//     age,
//     size,
//     description,
//     status,
//     is_visible = 1,
//     id_breed,
//     image_url,
//   } = animalData;
//   // insère d'abord l'animal dans la table
//   const queryAnimal = `
//     INSERT INTO animals (name, gender, age, size, description, status, is_visible, id_breed) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const [resultAnimal] = await pool.execute(queryAnimal, [
//     name,
//     gender,
//     age,
//     size,
//     description,
//     status,
//     is_visible,
//     id_breed,
//   ]);
//   // récupère l'ID que MySQL vient de créer automatiquement
//   const newAnimalId = resultAnimal.insertId;

//   // insertion de l'URL dans la table animals_pictures
//   const queryPicture = `
//     INSERT INTO animals_pictures (url, id_animal) 
//     VALUES (?, ?)
//   `;

//   await pool.execute(queryPicture, [image_url, newAnimalId]);

//   // retourne l'ID de l'animal créé
//   return newAnimalId;
// };

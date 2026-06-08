import pool from '../config/db.js';

// fonction qui trouve un animal
export const findById = async id => {
  const [rows] = await pool.execute('SELECT * FROM animals WHERE id = ?', [id]);

  return rows[0] ?? null;
};

export const createWithPicture = async ({
  name,
  gender,
  age,
  size,
  description,
  status,
  is_visible,
  id_breed,
  urls,
}) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insertion de l'animal (
    const sqlAnimal =
      'INSERT INTO animals (name, gender, age, size, description, status, is_visible, id_breed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [resultAnimal] = await connection.execute(sqlAnimal, [
      name,
      gender,
      age,
      size,
      description,
      status,
      is_visible,
      id_breed,
    ]);
    const newAnimalId = resultAnimal.insertId;

    // Insertion des photos (boucle si y a des URLs)
    if (urls && urls.length > 0) {
      const sqlPicture =
        'INSERT INTO animals_pictures (url, id_animal) VALUES (?, ?)';

      // Exécute l'insertion pour chaque URL du tableau
      for (const url of urls) {
        await connection.execute(sqlPicture, [url, newAnimalId]);
      }
    }

    await connection.commit();
    return newAnimalId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

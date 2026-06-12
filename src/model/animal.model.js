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
  // Récupère une connexion à la base de données
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Requête SQL pour créer l'animal
    const sqlAnimal =
      'INSERT INTO animals (name, gender, age, size, description, status, is_visible, id_breed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    // Exécute l'insertion
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
    // Récupère l'id de l'animal créé
    const newAnimalId = resultAnimal.insertId;

    // Insertion des photos (boucle si y a des URLs)
    if (urls && urls.length > 0) {
      // Requête pour enregistrer une photo
      const sqlPicture =
        'INSERT INTO animals_pictures (url, id_animal) VALUES (?, ?)';

      // Parcourt toutes les URLs reçues
      for (const url of urls) {
        // Associe chaque photo à l'animal
        await connection.execute(sqlPicture, [url, newAnimalId]);
      }
    }
    // Valide les insertions
    await connection.commit();

    // Retourne l'id du nouvel animal
    return newAnimalId;
  } catch (error) {
    // Si une erreur survient annule ce qui a été fait
    await connection.rollback();

    throw error;
  } finally {
    // Libère la connexion pour qu'elle puisse être réutilisée
    connection.release();
  }
};

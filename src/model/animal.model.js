import pool from '../config/db.js';

export const findAll = async ({ page = 1, limit = 9, search = '' }) => {
  // Desctructuration et valeurs par défaut
  const offset = (page - 1) * limit;
  const searchName = `%${search}%`;
  // Jointure entre race et espèces et sous req sql pour les images
  const sqlData = `
  SELECT animals.*, species.name AS specie_name,
  (SELECT url FROM animals_pictures WHERE id_animal = animals.id LIMIT 1) AS picture_url
  FROM animals 
  INNER JOIN breeds ON animals.id_breed = breeds.id
  INNER JOIN species ON breeds.id_specie = species.id
  WHERE animals.name LIKE ? ORDER BY animals.created_at DESC LIMIT ? OFFSET ?
`;
  const [animals] = await pool.execute(sqlData, [
    searchName,
    String(limit),
    String(offset),
  ]);

  // Requête pour compter le total (sans LIMIT ni OFFSET )
  const sqlCount = `
    SELECT COUNT(*) AS total FROM animals 
    WHERE name LIKE ?
  `;
  const [countRows] = await pool.execute(sqlCount, [searchName]);
  const total = countRows[0].total; // Récupère le premièr résultat de l'index et extrait le total

  // Renvoie un objet contenant les deux infos
  return {
    animals,
    total,
  };
};

export const findById = async id => {
  const [animalRows] = await pool.execute(
    'SELECT * FROM animals WHERE id = ?',
    [id]
  );

  if (animalRows.length === 0) return null; // Si l'animal n'existe pas, arrête tout
  const animal = animalRows[0];

  const [pictureRows] = await pool.execute(
    'SELECT url FROM animals_pictures WHERE id_animal = ?',
    [id]
  );
  animal.urls = pictureRows.map(row => row.url);

  return animal;
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
    const newAnimalId = resultAnimal.insertId;

    // Insertion des photos (boucle si y a des URLs)
    if (urls && urls.length > 0) {
      const sqlPicture =
        'INSERT INTO animals_pictures (url, id_animal) VALUES (?, ?)';

      // Parcourt les URLs reçues
      for (const url of urls) {
        // Associe chaque photo à l'animal
        await connection.execute(sqlPicture, [url, newAnimalId]);
      }
    }
    await connection.commit();

    return newAnimalId;
  } catch (error) {
    // Si une erreur survient annule ce qui a été fait
    await connection.rollback();

    throw error;
  } finally {
    // Libère la connexion
    connection.release();
  }
};

// Met à jour un animal et ses photos
export const updateWithPicture = async (
  id,
  {
    // Récupère les données de l'animal et ses photos
    name,
    gender,
    age,
    size,
    description,
    status,
    is_visible,
    id_breed,
    urls,
  }
) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction(); // Transaction

    const sqlAnimal = `
      UPDATE animals 
      SET name = ?, gender = ?, age = ?, size = ?, description = ?, status = ?, is_visible = ?, id_breed = ?
      WHERE id = ?
    `;
    await connection.execute(sqlAnimal, [
      // Exécute la mise à jour avec les nouvelles valeurs
      name,
      gender,
      age,
      size,
      description,
      status,
      is_visible,
      id_breed,
      id,
    ]);

    await connection.execute(
      'DELETE FROM animals_pictures WHERE id_animal = ?',
      [id]
    );

    // Insère les nouvelles photos présentes dans le formulaire
    const activeUrls = urls
      ? urls.filter(url => url !== undefined && url !== null)
      : []; // Filtre les URLs valides

    if (activeUrls.length > 0) {
      // Si URLs valides, insère les dans animals_pictures
      const sqlPicture =
        'INSERT INTO animals_pictures (url, id_animal) VALUES (?, ?)';
      for (const url of activeUrls) {
        // Parcourt chaque URL valide et l'insère dans la table avec l'id de l'animal
        await connection.execute(sqlPicture, [url, id]); // Associe chaque photo à l'animal
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const updateStatus = async (id, status) => {
  const sql = 'UPDATE animals SET status = ? WHERE id = ?';
  const [result] = await pool.execute(sql, [status, id]);
  return result.affectedRows;
};

export const remove = async id => {
  const [result] = await pool.execute('DELETE FROM animals WHERE id = ?', [id]);
  return result.affectedRows === 1;
};

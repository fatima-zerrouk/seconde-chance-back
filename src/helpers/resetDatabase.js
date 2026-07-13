import pool from '../config/db.js';

export const resetDatabase = async () => {
  // Désactive temporairement les contraintes de clés étrangères pour éviter les blocages
  await pool.query('SET FOREIGN_KEY_CHECKS = 0');

  // Vide (TRUNCATE) les tables dynamiques
  // Efface les données des tests précédents et remet les compteurs d'ID à 1
  await pool.query('TRUNCATE TABLE users');
  await pool.query('TRUNCATE TABLE contacts');
  await pool.query('TRUNCATE TABLE animals_pictures');
  await pool.query('TRUNCATE TABLE animals');

  // Réactive les contraintes de clés étrangères pour l'intégrité des données soit à nouveau vérifiée
  await pool.query('SET FOREIGN_KEY_CHECKS = 1');

  // Insertion d'un animal de test par défaut
  await pool.query(`
    INSERT INTO animals (id, name, gender, age, size, description, status, is_visible, id_breed) 
    VALUES (1, 'Max', 'male', 3, 'big', 'Un super chien de test très joueur', 'available', 1, 1),
    (2, 'Toto', 'male', 5, 'small', 'Description', 'available', 1, 1)
  `);
};

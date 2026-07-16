import pool from '../config/db.js';

export const resetDatabase = async () => {
  // Désactive temporairement les contraintes de clés étrangères
  await pool.query('SET FOREIGN_KEY_CHECKS = 0');

  // Vide (TRUNCATE) les tables dynamiques
  await pool.query('TRUNCATE TABLE users');
  await pool.query('TRUNCATE TABLE contacts');
  await pool.query('TRUNCATE TABLE animals_pictures');
  await pool.query('TRUNCATE TABLE animals');

  // Réactive les contraintes de clés étrangères
  await pool.query('SET FOREIGN_KEY_CHECKS = 1');

  await pool.query(`
    INSERT INTO animals (id, name, gender, age, size, description, status, is_visible, id_breed) 
    VALUES (1, 'Max', 'male', 3, 'big', 'Un super chien de test très joueur', 'available', 1, 1),
    (2, 'Toto', 'male', 5, 'small', 'Description', 'available', 1, 1)
  `);
};

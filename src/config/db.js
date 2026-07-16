import mysql from 'mysql2/promise';

// pool de connexion permet de gérer plusieurs connexions à la bdd
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

// Test connexion
try {
  const connection = await pool.getConnection();
  ('Connexion à la base de données réussie');

  connection.release();
} catch (error) {
  console.error('Erreur de connexion à la base de données :', error.message);
}

export default pool;

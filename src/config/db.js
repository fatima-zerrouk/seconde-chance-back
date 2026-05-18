import mysql from 'mysql2/promise';
// import 'dotenv/config';

// pool de connexion permet de gérer plusieurs connexions à la bdd
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// TESTE CONNECTION
try {
  const connection = await pool.getConnection(); //récupère une connexion depuis le pool
  console.log('Connexion à la base de données réussie'); // si ça marche

  connection.release(); // sinon libère la connexion pour pzs bloquer le pool
} catch (error) {
  // attrape l'erreur
  console.error('Erreur de connexion à la base de données :', error.message);
}

export default pool;

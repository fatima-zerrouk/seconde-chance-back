import db from '../config/db.js';

export const findByEmail = async email => {
  //pour les requêtes préparer vaut mieux utiliser db.execute dans certains cas plutot que query
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.query(sql, [email]); // db.query mets du temps à répondre donc async/await
  return rows[0];
};

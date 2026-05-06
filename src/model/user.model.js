import db from '../config/db.js';

export const findbyemail = async email => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [rows] = await db.query(sql, [email]); // db.query mets du temps à répondre donc async/await
  return rows[0];
};

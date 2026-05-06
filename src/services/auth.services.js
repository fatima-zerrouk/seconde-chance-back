import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';

import * as userModel from '../model/user.model.js';

export const loginUser = async ({ email, password }) => {
  const user = await userModel.findbyemail(email); // apelle findbyemail
  if (!user) {
    throw new AppError('Identifiants incorrects', 401); //erreur si l'utilisateur n'existe pas
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) {
    throw new AppError('Identifiants incorrects', 401); // erreur mdp incorrect
  }
  const token = jwt.sign(
    //si ok crée le token
    { userId: user.id, email: user.email, role: user.role }, // données dans le token
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

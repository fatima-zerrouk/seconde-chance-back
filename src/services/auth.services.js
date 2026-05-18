import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';

import * as UserModel from '../model/user.model.js';

export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findByEmail(email); // apelle findByEmail
  if (!user) {
    throw new AppError('Identifiants incorrects', 401); //erreur si l'utilisateur n'existe pas
  }

  const isPassword = await bcrypt.compare(password, user.password); //isPassword compare le mdp en bdd et celui entrer c'est un boolean
  if (!isPassword) {
    throw new AppError('Identifiants incorrects', 401); // si false erreur mdp incorrect
  }

  const token = jwt.sign(
    //si true crée le token
    { userId: user.id, email: user.email, role: user.role }, // données dans le token (paylod)
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

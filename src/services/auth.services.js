import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../errors/AppError.js';

import * as UserModel from '../model/user.model.js';

export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new AppError('Identifiants incorrects', 401);
  }

  const isPassword = await bcrypt.compare(password, user.password); // Compare le mdp en bdd et celui entré
  if (!isPassword) {
    throw new AppError('Identifiants incorrects', 401);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role }, // Données dans le token (payload)
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

import { body } from 'express-validator';

export const validateAuth = [
  body('email')
    .isEmail()
    .withMessage('Format email invalide')
    .notEmpty()
    .withMessage('Email requis'),

  body('password').notEmpty().withMessage('Mot de passe requis'),
];

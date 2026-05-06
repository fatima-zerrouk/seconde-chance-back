import { body } from 'express-validator';

export const validateAuth = [
  body('email').notEmpty().isEmail().withMessage('Email invalide'),
  body('password')
    .notEmpty()
    .isLength({ min: 12 })
    .withMessage('Le mot de passe doit faire au moins 12 caractères")'),
  // body('content')
  // .notEmpty().withMessage('Le contenu est requis')
];

import { body, param } from 'express-validator';

export const validateAnimal = [
  body('name')
    .matches(/^[a-zA-ZàâäéèêëîïôöùûüçÉÀÂÄÈÊËÎÏÔÖÙÛÜÇ\s-]+$/) //lettres min et maj, les accents, les tirets (-) et les espaces (\s)
    .withMessage(
      'Le nom ne doit contenir que des lettres, des tirets ou des espaces'
    )
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir au minimum 2 à 50 caractères')
    .notEmpty()
    .withMessage('Le nom est requis'),

  body('gender')
    .isIn(['male', 'female'])
    .withMessage('Le genre doit être masculin ou féminin') //isIN() permet de vérifier que la donnée fait partie d'une liste précise de valeurs autorisées
    .notEmpty()
    .withMessage('Le genre est requis'),

  body('age')
    .isInt({ min: 0 })
    .withMessage("L'age doit être un entier positif")
    .notEmpty()
    .withMessage("L'age est requis"),

  body('size')
    .isIn(['small', 'medium', 'big'])
    .withMessage('La taille doit être grand, moyen ou petit')
    .notEmpty()
    .withMessage('La taille est requise'),

  body('description')
    .isLength({ min: 10, max: 500 })
    .withMessage('La description doit contenir au minimum 10 à 500 caractères')
    .notEmpty()
    .withMessage('La description est requise'),

  body('status')
    .isIn(['available', 'in_progress', 'adopted'])
    .withMessage('Le status doit être disponible, en cours ou adopté')
    .notEmpty()
    .withMessage('Le status est requis'),

  body('id_breed')
    .isInt({ min: 1 })
    .withMessage('La race sélectionnée n’est pas valide')
    .notEmpty()
    .withMessage('La race est requise'),

  body('specie')
    .isInt({ min: 1 })
    .withMessage("L'espèce sélectionnée n’est pas valide")
    .notEmpty()
    .withMessage("L'espèce est requise"),
];

export const validateAnimalId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage("L'id n'est pas un nombre entier positif"),
];

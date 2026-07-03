import { body, param } from 'express-validator';

export const validateAnimal = [
  body('name')
    .trim() //supprime les espaces inutiles début et fin
    .notEmpty()
    .withMessage('Le nom est requis')
    .matches(/^[a-zA-ZàâäéèêëîïôöùûüçÉÀÂÄÈÊËÎÏÔÖÙÛÜÇ\s-]+$/) //lettres min et maj, les accents, les tirets (-) et les espaces (\s)
    .withMessage(
      'Le nom ne doit contenir que des lettres, des tirets ou des espaces'
    )
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir au minimum 2 à 50 caractères'),

  body('gender')
    .notEmpty()
    .withMessage('Le genre est requis')
    .isIn(['male', 'female'])
    .withMessage('Le genre doit être masculin ou féminin'), //isIN() permet de vérifier que la donnée fait partie d'une liste précise de valeurs autorisées

  body('age')
    .isInt({ min: 0 })
    .withMessage("L'age doit être un entier positif")
    .notEmpty()
    .withMessage("L'age est requis"),

  body('size')
    .notEmpty()
    .withMessage('La taille est requise')
    .isIn(['small', 'medium', 'big'])
    .withMessage('La taille doit être grand, moyen ou petit'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('La description est requise')
    .isLength({ min: 10, max: 500 })
    .withMessage('La description doit contenir au minimum 10 à 500 caractères'),

  body('status')
    .notEmpty()
    .withMessage('Le status est requis')
    .isIn(['available', 'in_progress', 'adopted'])
    .withMessage('Le status doit être disponible, en cours ou adopté'),

  body('id_breed')
    .notEmpty()
    .withMessage('La race est requise')
    .isInt({ min: 1 })
    .withMessage('La race sélectionnée n’est pas valide')
    .toInt(), //converti "1" en 1

  body('specie')
    .notEmpty()
    .withMessage("L'espèce est requise")
    .isInt({ min: 1 })
    .withMessage("L'espèce sélectionnée n’est pas valide")
    .toInt(),
  body('urls')
    .isArray({ min: 1, max: 3 })
    .withMessage("Il faut entre 1 et 3 photos de l'animal")
    .custom(value => {
      // Garde que les vraies chaînes de caractères (vire null, undefined, "")
      const trueImages = value ? value.filter(Boolean) : [];

      // Si après filtrage il n'y a plus aucune image, envoie erreur
      if (trueImages.length < 1) {
        throw new Error("Il faut au moins une photo de l'animal");
      }
      return true;
    }),
  body('urls.*') // Valide chaque élément à l'intérieur du tableau
    .optional({ values: 'falsy' }) // Si url null ou undefind, parce que pas d'url ne lance pas d'erreur
    .isURL()
    .withMessage("L'une des URL des images n'est pas au bon format"),
];

export const validateAnimalId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage("L'id n'est pas un nombre entier positif")
    .toInt(),
];

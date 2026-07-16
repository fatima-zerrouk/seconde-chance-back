import { body } from 'express-validator';

export const statusValidate = [
  body('status')
    .notEmpty()
    .withMessage('Le status est requis')
    .isIn(['available', 'in_progress', 'adopted'])
    .withMessage('Le status doit être disponible, en cours ou adopté'),
];

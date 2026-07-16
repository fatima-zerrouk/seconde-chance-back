import { validationResult } from 'express-validator';

// Middleware qui utilise validationResult pour récupérer les erreurs
const validate = (req, res, next) => {
  const errors = validationResult(req); //Récupère les erreurs de validation liées à une requête

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
export default validate;

import { validationResult } from 'express-validator';

// middleware qui utilise validationResult pour récupérer les erreurs

const validate = (req, res, next) => {
  const errors = validationResult(req); //récupère les erreurs de validation liées à une requête
  if (!errors.isEmpty()) {
    // s'il y a une une erreur
    // arrête le code et envoie une réponse 400 (requête invalide)
    return res.status(400).json({ errors: errors.array() }); // transforme les erreurs en tableau lisible
  }
  next(); // si y a aucune erreur suivant
};
export default validate;

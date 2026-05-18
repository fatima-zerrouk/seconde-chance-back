import * as AuthService from '../services/auth.services.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body; // extrait email et password de req.body
  // Appelle authService.loginUser
  // Si loginUser jette une AppError (401), Express 5 l'enverra direct au errorHandler
  const token = await AuthService.loginUser({ email, password });
  res.json({ token }); //envoie res.json si succès
};

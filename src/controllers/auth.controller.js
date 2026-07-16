import * as AuthService from '../services/auth.services.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body; // Extrait email et password de req.body
  // Si loginUser jette une AppError (401), Express 5 l'enverra au errorHandler
  const token = await AuthService.loginUser({ email, password });
  res.json({ token });
};

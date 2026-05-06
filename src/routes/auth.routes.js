import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { validateAuth } from '../validators/auth.validator.js';

const router = Router();

router.post('/login', validateAuth, validate, AuthController.login);

export default router;

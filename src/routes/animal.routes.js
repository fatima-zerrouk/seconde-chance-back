import { Router } from 'express';
import * as AnimalController from '../controllers/animal.controller.js';
import * as AnimalValidator from '../validators/animal.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { uploadMiddleware } from '../middlewares/upload.middlware.js';

const router = Router();

router.post(
  '/upload',
  authenticate,
  authorizeRoles('admin'),
  uploadMiddleware,
  AnimalController.uploadImage
);

router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  AnimalValidator.validateAnimal,
  validate,
  AnimalController.createAnimal
);

export default router;

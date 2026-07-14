import { Router } from 'express';
import * as AnimalController from '../controllers/animal.controller.js';
import * as AnimalValidator from '../validators/animal.validator.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorize.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { uploadMiddleware } from '../middlewares/upload.middlware.js';
import { statusValidate } from '../validators/status.validator.js';

const router = Router();

router.get(
  '/',
  authenticate,
  authorizeRoles('admin'),
  AnimalController.getAllAnimals
);

router.patch(
  '/:id/status',
  authenticate,
  authorizeRoles('admin'),
  statusValidate,
  validate,
  AnimalController.updateAnimalStatus
);
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

router.get(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  AnimalController.getAnimalById
);

router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  AnimalValidator.validateAnimal,
  validate,
  AnimalController.updateAnimal
);
export default router;

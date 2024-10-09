import UserController from '../controllers/user/userController.js';
import userValidation from '../controllers/user/requests/usersFormRequest.js';
import registerValidation from '../controllers/user/requests/userRegisterFormRequest.js';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerValidation.register, UserController.register);
router.post('/login', UserController.login);

router.get('/', userValidation.index, UserController.index);
router.route('/:id')
  .get(userValidation.show, validationMiddleware, UserController.show)
  .put(userValidation.update, validationMiddleware, UserController.update)
  .delete(userValidation.delete, validationMiddleware, UserController.delete);

export default router;

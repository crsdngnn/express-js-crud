import { body } from 'express-validator';

const registerValidation = {
  register: [
    body('username').isString().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 }),
  ],
};

export default registerValidation;

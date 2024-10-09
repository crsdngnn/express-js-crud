import { body, param } from 'express-validator';

const userValidation = {
  create: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  index: [
    param('id').isMongoId().withMessage('Invalid user ID'),
    ],
  show: [
    param('id').isMongoId().withMessage('Invalid user ID'),
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  delete: [
    param('id').isMongoId().withMessage('Invalid user ID'),
  ],
};

export default userValidation;

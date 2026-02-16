import { Router } from 'express';
import { login } from './login.controller.js';

import { body } from 'express-validator';
import { checkValidators } from '../../middlewares/check-validators.js';

const router = Router();

// Validación de login
const validateLogin = [
    body('name').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    checkValidators
];

router.post('/login', validateLogin, login);

export default router;

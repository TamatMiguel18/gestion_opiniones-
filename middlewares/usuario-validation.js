import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear usuario
export const validateCreateUsuario = [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Formato de email incorrecto'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators
];

// Actualizar usuario
export const validateUpdateUsuario = [
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').optional().isEmail().withMessage('Formato de email incorrecto'),
    body('password').optional().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators
];

// Validación para ID
export const validateUsuarioId = [
    param('id').isMongoId().withMessage('ID de usuario no válido'),
    checkValidators
];

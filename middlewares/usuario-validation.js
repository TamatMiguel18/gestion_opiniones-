import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// ===============================
// CREAR USUARIO
// ===============================
export const validateCreateUsuario = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre es requerido'),

    body('apellido')
        .notEmpty()
        .withMessage('El apellido es requerido'),

    body('username')
        .notEmpty()
        .withMessage('El username es requerido'),

    body('email')
        .isEmail()
        .withMessage('Formato de email incorrecto'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    checkValidators
];


// ===============================
// ACTUALIZAR USUARIO
// ===============================
export const validateUpdateUsuario = [
    param('id')
        .isMongoId()
        .withMessage('ID de usuario no válido'),

    body('nombre')
        .optional()
        .notEmpty()
        .withMessage('El nombre no puede estar vacío'),

    body('apellido')
        .optional()
        .notEmpty()
        .withMessage('El apellido no puede estar vacío'),

    body('username')
        .optional()
        .notEmpty()
        .withMessage('El username no puede estar vacío'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Formato de email incorrecto'),

    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    checkValidators
];


// ===============================
// VALIDAR ID
// ===============================
export const validateUsuarioId = [
    param('id')
        .isMongoId()
        .withMessage('ID de usuario no válido'),

    checkValidators
];

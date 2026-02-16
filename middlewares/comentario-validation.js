import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateComentario = [
    body('opinion').isMongoId().withMessage('ID de opinión no válido'),
    body('contenido').notEmpty().withMessage('El contenido es requerido'),
    checkValidators
];

export const validateUpdateComentario = [
    param('id').isMongoId().withMessage('ID de comentario no válido'),
    body('contenido').notEmpty().withMessage('El contenido es requerido'),
    checkValidators
];

export const validateComentarioId = [
    param('id').isMongoId().withMessage('ID de comentario no válido'),
    checkValidators
];

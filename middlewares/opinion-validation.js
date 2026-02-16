import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateOpinion = [
    body('titulo').notEmpty().withMessage('El título es requerido'),
    body('categoria').notEmpty().withMessage('La categoría es requerida'),
    body('contenido').notEmpty().withMessage('El contenido es requerido'),
    checkValidators
];

export const validateUpdateOpinion = [
    param('id').isMongoId().withMessage('ID de opinión no válido'),
    body('titulo').optional().notEmpty().withMessage('El título no puede estar vacío'),
    body('categoria').optional().notEmpty().withMessage('La categoría no puede estar vacía'),
    body('contenido').optional().notEmpty().withMessage('El contenido no puede estar vacío'),
    checkValidators
];

export const validateOpinionId = [
    param('id').isMongoId().withMessage('ID de opinión no válido'),
    checkValidators
];

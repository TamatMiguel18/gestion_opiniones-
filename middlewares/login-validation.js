import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';
import jwt from 'jsonwebtoken';
import Usuario from '../src/usuarios/usuarios.model.js';

// Middleware para validar login
export const validateLogin = [
    body('name').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    checkValidators
];

// Middleware para validar login de admin (opcional si tienes admins)
export const validateLoginAdmin = [
    body('email').isEmail().withMessage('El email es requerido y debe ser válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    checkValidators
];

// Middleware para proteger rutas (JWT)
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No se proporcionó token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Usuario.findById(decoded.uid);
        if (!user || !user.isActive) {
            return res.status(401).json({ success: false, message: 'Usuario no válido' });
        }
        req.user = user; // guardar usuario en req
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token inválido', error: error.message });
    }
};

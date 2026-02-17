import { body } from 'express-validator';
import { checkValidators } from './check-validators.js';
import jwt from 'jsonwebtoken';
import Usuario from '../src/usuarios/usuarios.model.js';


// ===============================
// VALIDAR LOGIN NORMAL
// ===============================
export const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('El username es requerido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),

    checkValidators
];


// ===============================
// VALIDAR LOGIN ADMIN (si lo usas)
// ===============================
export const validateLoginAdmin = [
    body('email')
        .isEmail()
        .withMessage('El email es requerido y debe ser válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),

    checkValidators
];


// ===============================
// PROTEGER RUTAS (JWT)
// ===============================
export const authMiddleware = async (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó token'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Usuario.findById(decoded.uid);

        if (!user || user.estado === false) {
            return res.status(401).json({
                success: false,
                message: 'Usuario no válido'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido',
            error: error.message
        });
    }
};

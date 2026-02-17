'use strict';

import Usuario from '../usuarios/usuarios.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// ===============================
// LOGIN DE USUARIO
// ===============================
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username y contraseña son obligatorios',
            });
        }

        //  Buscar por username (no name)
        const user = await Usuario.findOne({ username });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Tu modelo usa "estado"
        if (user.estado === false) {
            return res.status(403).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        const validPassword = await user.comparePassword(password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta',
            });
        }

        const token = jwt.sign(
            { uid: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                token,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error en el login',
            error: error.message,
        });
    }
};

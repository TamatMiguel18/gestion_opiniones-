'use strict';

import Usuario from '../usuarios/usuarios.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Login de usuario
export const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                success: false,
                message: 'Nombre de usuario y contraseña son obligatorios',
            });
        }

        // Buscar usuario por nombre
        const user = await Usuario.findOne({ name });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Comparar password con bcrypt
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta',
            });
        }

        // Generar token JWT
        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el login',
            error: error.message,
        });
    }
};

'use strict';

import Usuario from './usuarios.model.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };
        const usuarios = await Usuario.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Usuario.countDocuments(filter);
        res.status(200).json({
            success: true,
            data: usuarios,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);
        if (!usuario || !usuario.isActive) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado o inactivo' });
        }
        res.status(200).json({ success: true, data: usuario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al buscar usuario', error: error.message });
    }
};

// Crear usuario
export const createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({ success: true, message: 'Usuario creado', data: usuario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
        console.log(error);
    }
};

// Actualizar usuario
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, message: 'Usuario actualizado', data: usuario });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
};

// Desactivar usuario
export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        res.status(200).json({ success: true, message: 'Usuario desactivado', data: usuario });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al desactivar usuario', error: error.message });
    }
};

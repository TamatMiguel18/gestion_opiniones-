import { Router } from 'express';
import { createUsuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario } from './usuarios.controller.js';
import { validateCreateUsuario, validateUpdateUsuario, validateUsuarioId } from '../../middlewares/usuario-validation.js';

import { authMiddleware } from '../../middlewares/login-validation.js';

const router = Router();

// Obtener usuarios
router.get('/', authMiddleware, getUsuarios);
router.get('/:id', authMiddleware, validateUsuarioId, getUsuarioById);

// Crear usuario
router.post('/', validateCreateUsuario, createUsuario);

// Actualizar usuario
router.put('/:id', authMiddleware, validateUpdateUsuario, updateUsuario);

// Desactivar usuario
router.delete('/:id', authMiddleware, validateUsuarioId, deleteUsuario);

export default router;

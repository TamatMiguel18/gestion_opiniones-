import { Router } from 'express';
import { createComentario, getComentarios, updateComentario, deleteComentario } from './comentario.controller.js';
import { validateCreateComentario, validateUpdateComentario, validateComentarioId } from '../../middlewares/comentario-validation.js';
import { authMiddleware } from '../../middlewares/login-validation.js';

const router = Router();

router.get('/:opinionId', getComentarios);
router.post('/', authMiddleware, validateCreateComentario, createComentario);
router.put('/:id', authMiddleware, validateUpdateComentario, updateComentario);
router.delete('/:id', authMiddleware, validateComentarioId, deleteComentario);

export default router;

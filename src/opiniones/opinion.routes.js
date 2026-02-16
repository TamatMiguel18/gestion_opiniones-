import { Router } from 'express';
import { createOpinion, getOpiniones, updateOpinion, deleteOpinion } from './opinion.controller.js';
import { validateCreateOpinion, validateUpdateOpinion, validateOpinionId } from '../../middlewares/opinion-validation.js';
import { authMiddleware } from '../../middlewares/login-validation.js';

const router = Router();

router.get('/', getOpiniones);
router.post('/', authMiddleware, validateCreateOpinion, createOpinion);
router.put('/:id', authMiddleware, validateUpdateOpinion, updateOpinion);
router.delete('/:id', authMiddleware, validateOpinionId, deleteOpinion);

export default router;

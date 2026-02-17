import { Router } from 'express';
import { login } from './login.controller.js';
import { validateLogin } from '../../middlewares/login-validation.js';

const router = Router();

router.post('/', validateLogin, login);

export default router;

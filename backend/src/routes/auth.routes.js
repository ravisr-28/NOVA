import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { validateRegister, validateLogin } from '../validators/auth.validator.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post('/login', validateLogin, login);

// GET /api/auth/me (protected)
router.get('/me', protect, getMe);

export default router;

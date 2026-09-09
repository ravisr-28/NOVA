import { Router } from 'express';
import { searchUsers, getProfile, updateProfile } from '../controllers/user.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

// All routes are protected
router.use(protect);

router.get('/search', searchUsers);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

export default router;

import { Router } from 'express';
import { getMyActivities, getProjectActivities } from '../controllers/activity.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/', getMyActivities);
router.get('/project/:projectId', getProjectActivities);

export default router;

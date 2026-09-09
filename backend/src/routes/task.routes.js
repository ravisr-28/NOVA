import { Router } from 'express';
import { getTask, updateTask, deleteTask } from '../controllers/task.controller.js';
import { validateUpdateTask } from '../validators/task.validator.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

// All routes are protected
router.use(protect);

// Direct task routes (by task ID)
router.route('/:id')
  .get(getTask)
  .put(validateUpdateTask, updateTask)
  .delete(deleteTask);

export default router;

import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  getMembers,
} from '../controllers/project.controller.js';
import { getTasks, createTask } from '../controllers/task.controller.js';
import { validateCreateProject, validateUpdateProject } from '../validators/project.validator.js';
import { validateCreateTask } from '../validators/task.validator.js';
import protect from '../middleware/auth.middleware.js';

const router = Router();

// All routes are protected
router.use(protect);

// Project CRUD
router.route('/')
  .get(getProjects)
  .post(validateCreateProject, createProject);

router.route('/:id')
  .get(getProject)
  .put(validateUpdateProject, updateProject)
  .delete(deleteProject);

// Project members
router.post('/:id/members', addMember);
router.delete('/:id/members/:userId', removeMember);
router.get('/:id/members', getMembers);

// Project tasks (nested)
router.get('/:projectId/tasks', getTasks);
router.post('/:projectId/tasks', validateCreateTask, createTask);

export default router;

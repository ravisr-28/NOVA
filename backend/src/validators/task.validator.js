import ApiError from '../utils/ApiError.js';
import { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } from '../utils/constants.js';

/**
 * Validate create task request body.
 */
export const validateCreateTask = (req, res, next) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, 'Task title is required');
  }

  if (title.length > 200) {
    throw new ApiError(400, 'Task title cannot exceed 200 characters');
  }

  if (req.body.status && !TASK_STATUS_VALUES.includes(req.body.status)) {
    throw new ApiError(400, `Invalid status. Must be one of: ${TASK_STATUS_VALUES.join(', ')}`);
  }

  if (req.body.priority && !TASK_PRIORITY_VALUES.includes(req.body.priority)) {
    throw new ApiError(400, `Invalid priority. Must be one of: ${TASK_PRIORITY_VALUES.join(', ')}`);
  }

  next();
};

/**
 * Validate update task request body.
 */
export const validateUpdateTask = (req, res, next) => {
  if (req.body.title !== undefined && !req.body.title.trim()) {
    throw new ApiError(400, 'Task title cannot be empty');
  }

  if (req.body.status && !TASK_STATUS_VALUES.includes(req.body.status)) {
    throw new ApiError(400, `Invalid status. Must be one of: ${TASK_STATUS_VALUES.join(', ')}`);
  }

  if (req.body.priority && !TASK_PRIORITY_VALUES.includes(req.body.priority)) {
    throw new ApiError(400, `Invalid priority. Must be one of: ${TASK_PRIORITY_VALUES.join(', ')}`);
  }

  next();
};

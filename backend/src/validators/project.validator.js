import ApiError from '../utils/ApiError.js';
import { PROJECT_STATUS_VALUES } from '../utils/constants.js';

/**
 * Validate create project request body.
 */
export const validateCreateProject = (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Project name is required');
  }

  if (name.length > 100) {
    throw new ApiError(400, 'Project name cannot exceed 100 characters');
  }

  if (req.body.status && !PROJECT_STATUS_VALUES.includes(req.body.status)) {
    throw new ApiError(400, `Invalid status. Must be one of: ${PROJECT_STATUS_VALUES.join(', ')}`);
  }

  next();
};

/**
 * Validate update project request body.
 */
export const validateUpdateProject = (req, res, next) => {
  if (req.body.name !== undefined && !req.body.name.trim()) {
    throw new ApiError(400, 'Project name cannot be empty');
  }

  if (req.body.status && !PROJECT_STATUS_VALUES.includes(req.body.status)) {
    throw new ApiError(400, `Invalid status. Must be one of: ${PROJECT_STATUS_VALUES.join(', ')}`);
  }

  next();
};

import ApiError from '../utils/ApiError.js';

/**
 * Validate register request body.
 */
export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, 'Name is required');
  }

  if (!email || !email.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Please provide a valid email');
  }

  if (!password || password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }

  next();
};

/**
 * Validate login request body.
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    throw new ApiError(400, 'Email is required');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required');
  }

  next();
};

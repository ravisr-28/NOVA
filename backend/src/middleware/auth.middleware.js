import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * Protect routes — verify JWT and attach user to req.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new ApiError(401, 'Not authorized — no token provided');
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find user and attach to request
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, 'Not authorized — user not found');
  }

  req.user = user;
  next();
});


export default protect;

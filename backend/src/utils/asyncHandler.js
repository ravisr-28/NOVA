/**
 * Wraps an async controller function so that any thrown error
 * is automatically passed to Express's next() error handler.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

import jwt from 'jsonwebtoken';

/**
 * Generate a signed JWT for a given user ID.
 * @param {string} userId - The MongoDB _id of the user
 * @returns {string} Signed JWT string
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export default generateToken;

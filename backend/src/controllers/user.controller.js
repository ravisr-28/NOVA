import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

/**
 * @route   GET /api/users/search?q=...
 * @desc    Search users by name or email (for adding members)
 * @access  Private
 */
export const searchUsers = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length < 2) {
    return res.json({ success: true, data: [] });
  }

  const users = await User.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
    ],
    _id: { $ne: req.user._id }, // Exclude current user
  })
    .select('name email avatar')
    .limit(10);

  res.json({ success: true, data: users });
});

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ success: true, data: user });
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (name !== undefined) {
    if (!name.trim()) throw new ApiError(400, 'Name cannot be empty');
    user.name = name;
  }
  if (avatar !== undefined) user.avatar = avatar;

  await user.save();

  res.json({ success: true, data: user });
});

import Activity from '../models/Activity.js';
import Project from '../models/Project.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

/**
 * @route   GET /api/activities/project/:projectId
 * @desc    Get activities for a specific project
 * @access  Private (project member only)
 */
export const getProjectActivities = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isMember = project.members.some((m) => m.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to view this project\'s activity');
  }

  const activities = await Activity.find({ project: req.params.projectId })
    .populate('user', 'name email avatar')
    .sort({ createdAt: -1 })
    .limit(30);

  res.json({ success: true, data: activities });
});

/**
 * @route   GET /api/activities
 * @desc    Get recent activities across all user's projects
 * @access  Private
 */
export const getMyActivities = asyncHandler(async (req, res) => {
  const projects = await Project.find({ members: req.user._id });
  const projectIds = projects.map((p) => p._id);

  const activities = await Activity.find({ project: { $in: projectIds } })
    .populate('user', 'name email avatar')
    .populate('project', 'name')
    .sort({ createdAt: -1 })
    .limit(20);

  res.json({ success: true, data: activities });
});

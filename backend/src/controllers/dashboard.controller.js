import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Activity from '../models/Activity.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics for current user (PROJECT METRICS ONLY)
 * @access  Private
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get user's projects with full populated fields
  const allProjects = await Project.find({ members: userId })
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar')
    .sort({ updatedAt: -1 });

  const projectIds = allProjects.map((p) => p._id);
  const now = new Date();

  // Categorize PROJECTS ONLY
  const inProgressProjectsList = allProjects.filter(
    (p) => p.status === 'active' || p.status === 'planning'
  );
  const completedProjectsList = allProjects.filter(
    (p) => p.status === 'completed'
  );
  const overdueProjectsList = allProjects.filter(
    (p) => p.deadline && new Date(p.deadline) < now && p.status !== 'completed'
  );

  const stats = {
    totalProjects: allProjects.length,
    inProgressProjects: inProgressProjectsList.length,
    completedProjects: completedProjectsList.length,
    overdueProjects: overdueProjectsList.length,
  };

  const projectCategories = {
    total: allProjects,
    inProgress: inProgressProjectsList,
    completed: completedProjectsList,
    overdue: overdueProjectsList,
  };

  // Recent activity (last 10)
  const recentActivity = await Activity.find({ project: { $in: projectIds } })
    .populate('user', 'name email avatar')
    .populate('project', 'name')
    .sort({ createdAt: -1 })
    .limit(10);

  res.json({
    success: true,
    data: {
      stats,
      projectCategories,
      recentProjects: allProjects.slice(0, 5),
      recentActivity,
    },
  });
});

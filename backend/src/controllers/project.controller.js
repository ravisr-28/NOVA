import Project from '../models/Project.js';
import Task from '../models/Task.js';
import Activity from '../models/Activity.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ACTIVITY_ACTIONS } from '../utils/constants.js';

/**
 * @route   GET /api/projects
 * @desc    Get all projects for current user (owner or member)
 * @access  Private
 */
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    members: req.user._id,
  })
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar')
    .sort({ updatedAt: -1 });

  // Attach task counts to each project
  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const taskCounts = await Task.aggregate([
        { $match: { project: project._id } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      const counts = { total: 0, todo: 0, 'in-progress': 0, review: 0, completed: 0 };
      taskCounts.forEach((tc) => {
        counts[tc._id] = tc.count;
        counts.total += tc.count;
      });

      return {
        ...project.toObject(),
        taskCounts: counts,
      };
    })
  );

  res.json({ success: true, data: projectsWithCounts });
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project by ID
 * @access  Private (member only)
 */
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar');

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  // Check if user is a member
  const isMember = project.members.some((m) => m._id.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to access this project');
  }

  // Get task counts
  const taskCounts = await Task.aggregate([
    { $match: { project: project._id } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const counts = { total: 0, todo: 0, 'in-progress': 0, review: 0, completed: 0 };
  taskCounts.forEach((tc) => {
    counts[tc._id] = tc.count;
    counts.total += tc.count;
  });

  res.json({
    success: true,
    data: { ...project.toObject(), taskCounts: counts },
  });
});

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
export const createProject = asyncHandler(async (req, res) => {
  const { name, description, deadline, status } = req.body;

  const project = await Project.create({
    name,
    description,
    deadline: deadline || null,
    status: status || 'planning',
    owner: req.user._id,
    members: [req.user._id],
  });

  // Log activity
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.PROJECT_CREATED,
    description: `created project "${project.name}"`,
  });

  const populated = await Project.findById(project._id)
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar');

  res.status(201).json({ success: true, data: { ...populated.toObject(), taskCounts: { total: 0, todo: 0, 'in-progress': 0, review: 0, completed: 0 } } });
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Private (owner only)
 */
export const updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, 'Only the project owner can update this project');
  }

  const { name, description, deadline, status } = req.body;

  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (deadline !== undefined) project.deadline = deadline || null;
  if (status !== undefined) project.status = status;

  await project.save();

  // Log activity
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.PROJECT_UPDATED,
    description: `updated project "${project.name}"`,
  });

  project = await Project.findById(project._id)
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar');

  res.json({ success: true, data: project });
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project and its tasks/activities
 * @access  Private (owner only)
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, 'Only the project owner can delete this project');
  }

  // Cascade delete tasks and activities
  await Task.deleteMany({ project: project._id });
  await Activity.deleteMany({ project: project._id });
  await Project.findByIdAndDelete(project._id);

  res.json({ success: true, message: 'Project deleted successfully' });
});

/**
 * @route   POST /api/projects/:id/members
 * @desc    Add a member to a project
 * @access  Private (owner only)
 */
export const addMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, 'Only the project owner can add members');
  }

  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Check if already a member
  if (project.members.some((m) => m.equals(userId))) {
    throw new ApiError(400, 'User is already a member of this project');
  }

  project.members.push(userId);
  await project.save();

  // Log activity
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.MEMBER_ADDED,
    description: `added ${user.name} to the project`,
  });

  const populated = await Project.findById(project._id)
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar');

  res.json({ success: true, data: populated });
});

/**
 * @route   DELETE /api/projects/:id/members/:userId
 * @desc    Remove a member from a project
 * @access  Private (owner only)
 */
export const removeMember = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, 'Only the project owner can remove members');
  }

  // Can't remove owner
  if (project.owner.equals(req.params.userId)) {
    throw new ApiError(400, 'Cannot remove the project owner');
  }

  const user = await User.findById(req.params.userId);

  project.members = project.members.filter((m) => !m.equals(req.params.userId));
  await project.save();

  // Unassign tasks from removed member
  await Task.updateMany(
    { project: project._id, assignedTo: req.params.userId },
    { assignedTo: null }
  );

  // Log activity
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.MEMBER_REMOVED,
    description: `removed ${user ? user.name : 'a member'} from the project`,
  });

  const populated = await Project.findById(project._id)
    .populate('owner', 'name email avatar')
    .populate('members', 'name email avatar');

  res.json({ success: true, data: populated });
});

/**
 * @route   GET /api/projects/:id/members
 * @desc    Get all members of a project
 * @access  Private (member only)
 */
export const getMembers = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate('members', 'name email avatar');

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isMember = project.members.some((m) => m._id.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to access this project');
  }

  res.json({ success: true, data: project.members });
});

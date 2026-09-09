import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Activity from '../models/Activity.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ACTIVITY_ACTIONS } from '../utils/constants.js';

/**
 * @route   GET /api/projects/:projectId/tasks
 * @desc    Get all tasks for a project
 * @access  Private (project member only)
 */
export const getTasks = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isMember = project.members.some((m) => m.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to access this project');
  }

  const tasks = await Task.find({ project: req.params.projectId })
    .populate('assignedTo', 'name email avatar')
    .populate('createdBy', 'name email avatar')
    .sort({ createdAt: -1 });

  res.json({ success: true, data: tasks });
});

/**
 * @route   POST /api/projects/:projectId/tasks
 * @desc    Create a task in a project
 * @access  Private (project member only)
 */
export const createTask = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isMember = project.members.some((m) => m.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to add tasks to this project');
  }

  const { title, description, status, priority, dueDate, assignedTo } = req.body;

  // Members cannot assign task to owner
  const isOwner = project.owner.toString() === req.user._id.toString();
  if (assignedTo && !isOwner && assignedTo.toString() === project.owner.toString()) {
    throw new ApiError(403, 'Team members cannot assign tasks to the project owner');
  }

  // Task due date cannot be after project deadline
  if (dueDate && project.deadline) {
    const taskDue = new Date(dueDate);
    const projDeadline = new Date(project.deadline);
    if (taskDue.setHours(0, 0, 0, 0) > projDeadline.setHours(0, 0, 0, 0)) {
      throw new ApiError(400, 'Task due date cannot be after the project deadline');
    }
  }

  // If assigning, verify assignee is a project member
  if (assignedTo) {
    const isAssigneeMember = project.members.some((m) => m.equals(assignedTo));
    if (!isAssigneeMember) {
      throw new ApiError(400, 'Assigned user must be a project member');
    }
  }

  const task = await Task.create({
    title,
    description,
    project: project._id,
    createdBy: req.user._id,
    assignedTo: assignedTo || null,
    status: status || 'todo',
    priority: priority || 'medium',
    dueDate: dueDate || null,
  });

  // Log activity
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.TASK_CREATED,
    description: `created task "${task.title}"`,
  });

  const populated = await Task.findById(task._id)
    .populate('assignedTo', 'name email avatar')
    .populate('createdBy', 'name email avatar');

  res.status(201).json({ success: true, data: populated });
});

/**
 * @route   GET /api/tasks/:id
 * @desc    Get a single task
 * @access  Private
 */
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignedTo', 'name email avatar')
    .populate('createdBy', 'name email avatar')
    .populate('project', 'name');

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.json({ success: true, data: task });
});

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update a task
 * @access  Private (project member)
 */
export const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const project = await Project.findById(task.project);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isMember = project.members.some((m) => m.equals(req.user._id));
  if (!isMember) {
    throw new ApiError(403, 'Not authorized to update this task');
  }

  const { title, description, status, priority, dueDate, assignedTo } = req.body;

  // Members cannot assign task to owner
  const isOwner = project.owner.toString() === req.user._id.toString();
  if (assignedTo && !isOwner && assignedTo.toString() === project.owner.toString()) {
    throw new ApiError(403, 'Team members cannot assign tasks to the project owner');
  }

  // Task due date cannot be after project deadline
  if (dueDate && project.deadline) {
    const taskDue = new Date(dueDate);
    const projDeadline = new Date(project.deadline);
    if (taskDue.setHours(0, 0, 0, 0) > projDeadline.setHours(0, 0, 0, 0)) {
      throw new ApiError(400, 'Task due date cannot be after the project deadline');
    }
  }

  // Track what changed for activity log
  const oldStatus = task.status;
  const oldAssignee = task.assignedTo;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate || null;
  if (assignedTo !== undefined) task.assignedTo = assignedTo || null;

  await task.save();

  // Log status change
  if (status && status !== oldStatus) {
    await Activity.create({
      user: req.user._id,
      project: project._id,
      action: ACTIVITY_ACTIONS.TASK_STATUS_CHANGED,
      description: `moved "${task.title}" to ${status}`,
    });
  }

  // Log assignment change
  if (assignedTo && (!oldAssignee || !oldAssignee.equals(assignedTo))) {
    await Activity.create({
      user: req.user._id,
      project: project._id,
      action: ACTIVITY_ACTIONS.TASK_ASSIGNED,
      description: `assigned "${task.title}"`,
    });
  }

  // Log generic update (if not status or assignment specific)
  if (!status && !assignedTo) {
    await Activity.create({
      user: req.user._id,
      project: project._id,
      action: ACTIVITY_ACTIONS.TASK_UPDATED,
      description: `updated task "${task.title}"`,
    });
  }

  task = await Task.findById(task._id)
    .populate('assignedTo', 'name email avatar')
    .populate('createdBy', 'name email avatar');

  res.json({ success: true, data: task });
});

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete a task
 * @access  Private (task creator or project owner)
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const project = await Project.findById(task.project);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const isOwner = project.owner.equals(req.user._id);
  const isCreator = task.createdBy.equals(req.user._id);

  if (!isOwner && !isCreator) {
    throw new ApiError(403, 'Only the project owner or task creator can delete this task');
  }

  // Log activity before deleting
  await Activity.create({
    user: req.user._id,
    project: project._id,
    action: ACTIVITY_ACTIONS.TASK_DELETED,
    description: `deleted task "${task.title}"`,
  });

  await Task.findByIdAndDelete(task._id);

  res.json({ success: true, message: 'Task deleted successfully' });
});

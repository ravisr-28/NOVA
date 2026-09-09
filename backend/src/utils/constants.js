export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  REVIEW: 'review',
  COMPLETED: 'completed',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PROJECT_STATUS = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  ON_HOLD: 'on-hold',
  COMPLETED: 'completed',
};

export const ACTIVITY_ACTIONS = {
  PROJECT_CREATED: 'project_created',
  PROJECT_UPDATED: 'project_updated',
  PROJECT_DELETED: 'project_deleted',
  TASK_CREATED: 'task_created',
  TASK_UPDATED: 'task_updated',
  TASK_DELETED: 'task_deleted',
  TASK_STATUS_CHANGED: 'task_status_changed',
  TASK_ASSIGNED: 'task_assigned',
  MEMBER_ADDED: 'member_added',
  MEMBER_REMOVED: 'member_removed',
};

export const TASK_STATUS_VALUES = Object.values(TASK_STATUS);
export const TASK_PRIORITY_VALUES = Object.values(TASK_PRIORITY);
export const PROJECT_STATUS_VALUES = Object.values(PROJECT_STATUS);
export const ACTIVITY_ACTION_VALUES = Object.values(ACTIVITY_ACTIONS);

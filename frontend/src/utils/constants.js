// Task statuses for Kanban columns
export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do', color: 'navy' },
  { value: 'in-progress', label: 'In Progress', color: 'gold' },
  { value: 'review', label: 'Review', color: 'teal' },
  { value: 'completed', label: 'Completed', color: 'teal' },
];

// Task priorities
export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'gray' },
  { value: 'medium', label: 'Medium', color: 'navy' },
  { value: 'high', label: 'High', color: 'gold' },
  { value: 'urgent', label: 'Urgent', color: 'red' },
];

// Project statuses
export const PROJECT_STATUSES = [
  { value: 'planning', label: 'Planning', color: 'navy' },
  { value: 'active', label: 'Active', color: 'teal' },
  { value: 'on-hold', label: 'On Hold', color: 'gold' },
  { value: 'completed', label: 'Completed', color: 'teal' },
];

// Sidebar nav items
export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/projects', label: 'Projects', icon: 'FolderKanban' },
];

// Get status/priority config by value
export const getStatusConfig = (value) =>
  TASK_STATUSES.find((s) => s.value === value) || TASK_STATUSES[0];

export const getPriorityConfig = (value) =>
  TASK_PRIORITIES.find((p) => p.value === value) || TASK_PRIORITIES[1];

export const getProjectStatusConfig = (value) =>
  PROJECT_STATUSES.find((s) => s.value === value) || PROJECT_STATUSES[0];

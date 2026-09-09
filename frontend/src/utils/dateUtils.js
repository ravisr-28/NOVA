/**
 * Format a date string to a readable format.
 * e.g. "Sep 7, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a date to relative time.
 * e.g. "2 hours ago", "3 days ago"
 */
export const timeAgo = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  return formatDate(dateString);
};

/**
 * Check if a date is in the past.
 */
export const isOverdue = (dateString) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

/**
 * Format date for input[type="date"] value (YYYY-MM-DD)
 */
export const toInputDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

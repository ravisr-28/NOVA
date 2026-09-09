import { useState } from 'react';
import { Plus, Calendar, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { TASK_STATUSES, getPriorityConfig, getStatusConfig } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import '../../styles/tasks.css';

const TaskBoard = ({ tasks = [], onTaskClick, onAddTask }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.status === activeFilter);

  const getStatusCount = (statusVal) => {
    if (statusVal === 'all') return tasks.length;
    return tasks.filter((t) => t.status === statusVal).length;
  };

  return (
    <div className="task-list-wrapper">
      {/* Header */}
      <div className="task-list-header">
        <div className="task-list-title-area">
          <h3>Task List</h3>
          <span className="task-list-total-count">{tasks.length}</span>
        </div>

        <div className="task-list-header-actions">
          {/* Status Filter Tabs */}
          <div className="task-filter-tabs">
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All ({getStatusCount('all')})
            </button>
            {TASK_STATUSES.map((status) => (
              <button
                key={status.value}
                type="button"
                className={`filter-tab ${activeFilter === status.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(status.value)}
              >
                {status.label} ({getStatusCount(status.value)})
              </button>
            ))}
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onAddTask}>
            Add Task
          </Button>
        </div>
      </div>

      {/* Task List */}
      <div className="task-list-container">
        {filteredTasks.length === 0 ? (
          <div className="task-list-empty">
            <p>No tasks {activeFilter !== 'all' ? `marked "${activeFilter}"` : 'created yet'}.</p>
            <Button variant="outline" size="sm" icon={Plus} onClick={onAddTask} style={{ marginTop: 8 }}>
              Create First Task
            </Button>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => {
              const priorityConfig = getPriorityConfig(task.priority);
              const statusConfig = getStatusConfig(task.status);
              const dueOverdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'completed';

              return (
                <div
                  key={task._id}
                  className="task-list-item"
                  onClick={() => onTaskClick(task)}
                >
                  {/* Left Column: Status Badge, Title & Priority */}
                  <div className="task-list-left">
                    <Badge variant={statusConfig.color} size="sm" dot>
                      {statusConfig.label}
                    </Badge>
                    <span className="task-list-title">{task.title}</span>
                    <Badge variant={priorityConfig.color} size="sm">
                      {priorityConfig.label}
                    </Badge>
                  </div>

                  {/* Right Column: Date, Profile Avatar, Arrow */}
                  <div className="task-list-right">
                    {task.dueDate ? (
                      <span className={`task-list-due ${dueOverdue ? 'overdue' : ''}`}>
                        <Calendar size={13} />
                        {formatDate(task.dueDate)}
                      </span>
                    ) : (
                      <span className="task-list-due-empty">No date</span>
                    )}

                    {task.assignedTo ? (
                      <div className="task-list-assignee" title={`Assigned to ${task.assignedTo.name}`}>
                        <Avatar
                          name={task.assignedTo.name}
                          avatar={task.assignedTo.avatar}
                          size="sm"
                        />
                        <span className="task-list-assignee-name">{task.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="task-list-unassigned">Unassigned</span>
                    )}

                    <ChevronRight size={16} className="task-list-arrow" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBoard;

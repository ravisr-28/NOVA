import { Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import Avatar from '../ui/Avatar';
import { getPriorityConfig } from '../../utils/constants';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import '../../styles/tasks.css';

const TaskCard = ({ task, onClick }) => {
  const priorityConfig = getPriorityConfig(task.priority);
  const dueOverdue = task.dueDate && isOverdue(task.dueDate) && task.status !== 'completed';

  return (
    <div className="task-card" onClick={() => onClick(task)}>
      {/* Line 1: Name (Title) and Priority in the same line */}
      <div className="task-card-header">
        <h4 className="task-card-title">{task.title}</h4>
        <Badge variant={priorityConfig.color} size="sm">
          {priorityConfig.label}
        </Badge>
      </div>

      {/* Line 2: Date and Profile */}
      <div className="task-card-footer">
        {task.dueDate ? (
          <span className={`task-card-due ${dueOverdue ? 'overdue' : ''}`}>
            <Calendar size={12} />
            {formatDate(task.dueDate)}
          </span>
        ) : (
          <span className="task-card-due-empty">No due date</span>
        )}

        {task.assignedTo && (
          <div className="task-card-assignee" title={`Assigned to ${task.assignedTo.name}`}>
            <Avatar
              name={task.assignedTo.name}
              avatar={task.assignedTo.avatar}
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import ProgressBar from "../ui/ProgressBar";
import { getProjectStatusConfig } from "../../utils/constants";
import { formatDate, isOverdue } from "../../utils/dateUtils";
import "../../styles/projects.css";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const statusConfig = getProjectStatusConfig(project.status);
  const taskCounts = project.taskCounts || { total: 0, completed: 0 };
  const progress =
    taskCounts.total > 0 ? (taskCounts.completed / taskCounts.total) * 100 : 0;
  const deadlineOverdue =
    project.deadline &&
    isOverdue(project.deadline) &&
    project.status !== "completed";

  return (
    <div
      className="project-card"
      onClick={() => navigate(`/projects/${project._id}`)}
    >
      <div className="project-card-header">
        <h3 className="project-card-title">{project.name}</h3>
        <Badge variant={statusConfig.color} size="sm" dot>
          {statusConfig.label}
        </Badge>
      </div>

      {project.description && (
        <p className="project-card-desc">{project.description}</p>
      )}

      <div className="project-card-progress">
        <ProgressBar
          value={progress}
          label={`${taskCounts.completed}/${taskCounts.total} tasks`}
        />
      </div>

      <div className="project-card-footer">
        <div className="project-card-meta">
          <div className="avatar-stack">
            {project.members?.slice(0, 3).map((member) => (
              <Avatar
                key={member._id}
                name={member.name}
                avatar={member.avatar}
                size="sm"
              />
            ))}
            {project.members?.length > 3 && (
              <span className="avatar-stack-count">
                +{project.members.length - 3}
              </span>
            )}
          </div>
          <span>
            <Users size={14} /> {project.members?.length || 0}
          </span>
        </div>

        {project.deadline && (
          <span
            className={`project-card-deadline ${deadlineOverdue ? "overdue" : ""}`}
          >
            <Calendar size={12} />
            {formatDate(project.deadline)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Edit,
  Trash2,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import useTasks from "../hooks/useTasks";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskForm from "../components/tasks/TaskForm";
import ProjectForm from "../components/projects/ProjectForm";
import MemberList from "../components/team/MemberList";
import AddMember from "../components/team/AddMember";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import Loader from "../components/ui/Loader";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { getProjectStatusConfig } from "../utils/constants";
import { formatDate, isOverdue } from "../utils/dateUtils";
import "../styles/projects.css";
import "../styles/tasks.css";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  const { tasks, fetchTasks, createTask, updateTask, deleteTask } =
    useTasks(id);

  // Task form state
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskLoading, setTaskLoading] = useState(false);

  // Project edit state
  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editProjectLoading, setEditProjectLoading] = useState(false);

  // Delete confirm state
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Add member state
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const fetchProject = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(`/projects/${id}`);
      setProject(res.data.data);
    } catch (err) {
      toast.error("Failed to load project");
      navigate("/projects");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const fetchActivities = useCallback(async () => {
    try {
      const res = await api.get(`/activities/project/${id}`);
      setActivities(res.data.data);
    } catch (err) {
      // Silent fail for activities
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
    fetchActivities();
  }, [fetchProject, fetchActivities]);

  // Handlers
  const handleCreateTask = async (data) => {
    setTaskLoading(true);
    try {
      await createTask(data);
      toast.success("Task created!");
      fetchActivities();
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setTaskLoading(false);
    }
  };

  const handleUpdateTask = async (data) => {
    setTaskLoading(true);
    try {
      await updateTask(editingTask._id, data);
      toast.success("Task updated!");
      setEditingTask(null);
      fetchActivities();
      fetchProject();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      setEditingTask(null);
      setTaskFormOpen(false);
      fetchActivities();
      fetchProject();
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleUpdateProject = async (data) => {
    setEditProjectLoading(true);
    try {
      const res = await api.put(`/projects/${id}`, data);
      setProject(res.data.data);
      toast.success("Project updated!");
      fetchActivities();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update project");
    } finally {
      setEditProjectLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      navigate("/projects");
    } catch (err) {
      toast.error("Failed to delete project");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      const res = await api.delete(`/projects/${id}/members/${userId}`);
      setProject(res.data.data);
      toast.success("Member removed");
      fetchActivities();
    } catch (err) {
      toast.error("Failed to remove member");
    }
  };

  if (loading) return <Loader />;
  if (!project) return null;

  const isOwner = project.owner?._id === user?._id;
  const statusConfig = getProjectStatusConfig(project.status);
  const taskCounts = project.taskCounts || { total: 0, completed: 0 };
  const progress =
    taskCounts.total > 0 ? (taskCounts.completed / taskCounts.total) * 100 : 0;

  return (
    <div>
      {/* Header */}
      <div className="project-detail-header">
        <div className="project-detail-info">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/projects")}
            style={{ marginBottom: 8 }}
          >
            <ArrowLeft size={16} /> Back to Projects
          </Button>
          <h1>{project.name}</h1>
          {project.description && (
            <p className="project-detail-desc">{project.description}</p>
          )}
          <div className="project-detail-meta">
            <Badge variant={statusConfig.color} size="md" dot>
              {statusConfig.label}
            </Badge>
            {project.deadline && (
              <span
                className="project-detail-meta-item"
                style={
                  isOverdue(project.deadline) && project.status !== "completed"
                    ? { color: "var(--color-error)" }
                    : {}
                }
              >
                <Calendar size={14} /> {formatDate(project.deadline)}
              </span>
            )}
            <span className="project-detail-meta-item">
              <Users size={14} /> {project.members?.length} members
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="project-detail-actions">
            <Button
              variant="outline"
              size="sm"
              icon={Edit}
              onClick={() => setEditProjectOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setDeleteConfirmOpen(true)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: "var(--sp-6)", maxWidth: 400 }}>
        <ProgressBar
          value={progress}
          label={`${taskCounts.completed}/${taskCounts.total} tasks completed`}
        />
      </div>

      {/* Content */}
      <div className="project-detail-content">
        {/* Task Board */}
        <div>
          <TaskBoard
            tasks={tasks}
            onTaskClick={(task) => {
              setEditingTask(task);
              setTaskFormOpen(true);
            }}
            onAddTask={() => {
              setEditingTask(null);
              setTaskFormOpen(true);
            }}
          />
        </div>

        {/* Side Panel */}
        <div className="project-side-panel">
          {/* Members */}
          <div className="side-panel-section">
            <div className="side-panel-header">
              <h3>Team ({project.members?.length})</h3>
              {isOwner && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={UserPlus}
                  onClick={() => setAddMemberOpen(true)}
                >
                  Add
                </Button>
              )}
            </div>
            <div className="side-panel-body">
              <MemberList
                members={project.members || []}
                ownerId={project.owner?._id}
                currentUserId={user?._id}
                onRemove={handleRemoveMember}
              />
            </div>
          </div>

          {/* Activity */}
          <div className="side-panel-section">
            <div className="side-panel-header">
              <h3>Activity</h3>
            </div>
            <div className="side-panel-body">
              <ActivityFeed activities={activities.slice(0, 10)} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TaskForm
        isOpen={taskFormOpen}
        onClose={() => {
          setTaskFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        onDelete={editingTask ? handleDeleteTask : null}
        task={editingTask}
        members={project.members || []}
        projectOwnerId={project.owner?._id}
        projectDeadline={project.deadline}
        isOwner={isOwner}
        loading={taskLoading}
      />

      <ProjectForm
        isOpen={editProjectOpen}
        onClose={() => setEditProjectOpen(false)}
        onSubmit={handleUpdateProject}
        project={project}
        loading={editProjectLoading}
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project?"
        message="This will permanently delete this project and all its tasks. This action cannot be undone."
        loading={deleteLoading}
      />

      <AddMember
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        projectId={id}
        existingMemberIds={project.members?.map((m) => m._id) || []}
        onMemberAdded={() => {
          fetchProject();
          fetchActivities();
        }}
      />
    </div>
  );
};

export default ProjectDetails;

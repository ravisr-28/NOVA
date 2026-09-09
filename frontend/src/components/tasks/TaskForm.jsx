import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { taskSchema } from '../../utils/validationSchemas';
import { TASK_STATUSES, TASK_PRIORITIES } from '../../utils/constants';
import { toInputDate, formatDate } from '../../utils/dateUtils';
import '../../styles/tasks.css';

const TaskForm = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  task = null,
  members = [],
  projectOwnerId = null,
  projectDeadline = null,
  isOwner = false,
  loading = false,
}) => {
  const isEditing = !!task;

  // Filter assignable members: non-owners cannot assign tasks to the project owner
  const assignableMembers = members.filter((m) => {
    if (!isOwner && projectOwnerId && (m._id === projectOwnerId || m._id?.toString() === projectOwnerId?.toString())) {
      return false;
    }
    return true;
  });

  const maxDueDate = toInputDate(projectDeadline);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'todo',
        priority: task?.priority || 'medium',
        dueDate: toInputDate(task?.dueDate) || '',
        assignedTo: typeof task?.assignedTo === 'object' ? task?.assignedTo?._id || '' : task?.assignedTo || '',
      });
    }
  }, [task, isOpen, reset]);

  const handleFormSubmit = async (data) => {
    if (data.dueDate && projectDeadline) {
      const taskDue = new Date(data.dueDate);
      const projDeadline = new Date(projectDeadline);
      if (taskDue.setHours(0, 0, 0, 0) > projDeadline.setHours(0, 0, 0, 0)) {
        toast.error(`Task due date cannot be after project deadline (${formatDate(projectDeadline)})`);
        return;
      }
    }

    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      footer={
        <>
          {isEditing && onDelete && (
            <Button
              variant="danger"
              size="md"
              icon={Trash2}
              onClick={() => onDelete(task._id)}
              style={{ marginRight: 'auto' }}
            >
              Delete
            </Button>
          )}
          <Button variant="ghost" size="md" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="md"
            loading={loading}
            onClick={handleSubmit(handleFormSubmit)}
          >
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </>
      }
    >
      <form className="task-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            type="text"
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="e.g. Design landing page"
            {...register('title')}
          />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            className="form-input"
            placeholder="Task details..."
            rows={3}
            style={{ height: 'auto', minHeight: '80px', resize: 'vertical', padding: '12px' }}
            {...register('description')}
          />
        </div>

        <div className="task-form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-status">Status</label>
            <div className="select-wrapper">
              <select id="task-status" className="select-native" {...register('status')}>
                {TASK_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-priority">Priority</label>
            <div className="select-wrapper">
              <select id="task-priority" className="select-native" {...register('priority')}>
                {TASK_PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="task-form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-assignee">Assign To</label>
            <div className="select-wrapper">
              <select id="task-assignee" className="select-native" {...register('assignedTo')}>
                <option value="">Unassigned</option>
                {assignableMembers.map((m) => (
                  <option key={m._id} value={m._id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-due">
              Due Date {projectDeadline && <span style={{ fontSize: 11, color: 'var(--color-gray-400)' }}>(Max: {formatDate(projectDeadline)})</span>}
            </label>
            <input
              id="task-due"
              type="date"
              className="form-input"
              max={maxDueDate || undefined}
              {...register('dueDate')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;

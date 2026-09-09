import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { projectSchema } from '../../utils/validationSchemas';
import { PROJECT_STATUSES } from '../../utils/constants';
import { toInputDate } from '../../utils/dateUtils';
import '../../styles/projects.css';

const ProjectForm = ({ isOpen, onClose, onSubmit, project = null, loading = false }) => {
  const isEditing = !!project;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      deadline: '',
      status: 'planning',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: project?.name || '',
        description: project?.description || '',
        deadline: toInputDate(project?.deadline) || '',
        status: project?.status || 'planning',
      });
    }
  }, [project, isOpen, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : 'Create New Project'}
      footer={
        <>
          <Button variant="ghost" size="md" onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            size="md"
            loading={loading}
            onClick={handleSubmit(handleFormSubmit)}
          >
            {isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </>
      }
    >
      <form className="project-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label" htmlFor="project-name">Project Name *</label>
          <input
            id="project-name"
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="e.g. Website Redesign"
            {...register('name')}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="project-desc">Description</label>
          <textarea
            id="project-desc"
            className={`form-input ${errors.description ? 'error' : ''}`}
            placeholder="Brief description of the project..."
            rows={3}
            style={{ height: 'auto', minHeight: '80px', resize: 'vertical', padding: '12px' }}
            {...register('description')}
          />
          {errors.description && <span className="form-error">{errors.description.message}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="project-status">Status</label>
            <div className="select-wrapper">
              <select
                id="project-status"
                className="select-native"
                {...register('status')}
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="project-deadline">Deadline</label>
            <input
              id="project-deadline"
              type="date"
              className="form-input"
              {...register('deadline')}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProjectForm;

import { useState } from 'react';
import { Plus, FolderKanban } from 'lucide-react';
import { toast } from 'sonner';
import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import '../styles/projects.css';

const Projects = () => {
  const { projects, loading, createProject } = useProjects();
  const [formOpen, setFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreate = async (data) => {
    setFormLoading(true);
    try {
      await createProject(data);
      toast.success('Project created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="projects-header">
        <h1>Projects</h1>
        <Button variant="primary" size="md" icon={Plus} onClick={() => setFormOpen(true)}>
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          message="Create your first project to start managing tasks and collaborating with your team."
          actionLabel="Create Project"
          onAction={() => setFormOpen(true)}
        />
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      <ProjectForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
        loading={formLoading}
      />
    </div>
  );
};

export default Projects;

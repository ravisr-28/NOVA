import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import useDashboard from '../hooks/useDashboard';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ProjectCard from '../components/projects/ProjectCard';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading } = useDashboard();
  const navigate = useNavigate();

  const [activeCategoryModal, setActiveCategoryModal] = useState(null);

  if (loading) return <Loader />;

  const stats = data?.stats || {};
  const projectCategories = data?.projectCategories || {};
  const recentProjects = data?.recentProjects || [];
  const recentActivity = data?.recentActivity || [];

  const categoryTitles = {
    total: 'All Listed Projects',
    inProgress: 'In Progress Projects',
    completed: 'Completed Projects',
    overdue: 'Overdue Projects',
  };

  const currentCategoryProjects = activeCategoryModal
    ? projectCategories[activeCategoryModal] || []
    : [];

  return (
    <div>
      {/* Greeting */}
      <div style={{ marginBottom: 'var(--sp-6)' }}>
        <h1 className="text-h1" style={{ marginBottom: 4 }}>
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p style={{ color: 'var(--color-gray-500)', fontSize: 15 }}>
          Here&apos;s what&apos;s happening across your projects
        </p>
      </div>

      {/* Stats Row - PROJECTS ONLY */}
      <div className="dashboard-stats">
        <StatCard
          icon={FolderKanban}
          value={stats.totalProjects || 0}
          label="Total Projects"
          color="navy"
          onClick={() => setActiveCategoryModal('total')}
        />
        <StatCard
          icon={Clock}
          value={stats.inProgressProjects || 0}
          label="In Progress Projects"
          color="gold"
          onClick={() => setActiveCategoryModal('inProgress')}
        />
        <StatCard
          icon={CheckCircle}
          value={stats.completedProjects || 0}
          label="Completed Projects"
          color="teal"
          onClick={() => setActiveCategoryModal('completed')}
        />
        <StatCard
          icon={AlertTriangle}
          value={stats.overdueProjects || 0}
          label="Overdue Projects"
          color="red"
          onClick={() => setActiveCategoryModal('overdue')}
        />
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Recent Projects */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3>Recent Projects</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/projects')}
            >
              View All <ArrowRight size={14} />
            </Button>
          </div>
          {recentProjects.length > 0 ? (
            <div className="dashboard-projects-grid">
              {recentProjects.slice(0, 4).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div
              className="dashboard-section-body"
              style={{
                textAlign: 'center',
                color: 'var(--color-gray-400)',
                padding: 40,
              }}
            >
              No projects yet. Create your first project to get started!
            </div>
          )}
        </div>

        {/* Activity Feed */}
        <div className="dashboard-section">
          <div className="dashboard-section-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="dashboard-section-body">
            <ActivityFeed activities={recentActivity} />
          </div>
        </div>
      </div>

      {/* Stat Card Details Modal */}
      {activeCategoryModal && (
        <Modal
          isOpen={!!activeCategoryModal}
          onClose={() => setActiveCategoryModal(null)}
          title={`${categoryTitles[activeCategoryModal]} (${currentCategoryProjects.length})`}
          size="lg"
        >
          {currentCategoryProjects.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="No Projects Found"
              description={`There are currently no projects in the "${categoryTitles[activeCategoryModal]}" category.`}
            />
          ) : (
            <div className="dashboard-projects-grid" style={{ padding: 0 }}>
              {currentCategoryProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;

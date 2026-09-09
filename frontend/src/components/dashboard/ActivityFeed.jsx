import Avatar from '../ui/Avatar';
import { timeAgo } from '../../utils/dateUtils';
import '../../styles/dashboard.css';

const ActivityFeed = ({ activities = [] }) => {
  if (activities.length === 0) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-gray-400)', fontSize: '13px' }}>
        No recent activity
      </div>
    );
  }

  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity._id} className="activity-item">
          <Avatar
            name={activity.user?.name}
            avatar={activity.user?.avatar}
            size="sm"
          />
          <div className="activity-content">
            <div className="activity-text">
              <strong>{activity.user?.name}</strong>{' '}
              {activity.description}
            </div>
            <div className="activity-meta">
              <span>{timeAgo(activity.createdAt)}</span>
              {activity.project?.name && (
                <>
                  <span>·</span>
                  <span className="activity-project">{activity.project.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;

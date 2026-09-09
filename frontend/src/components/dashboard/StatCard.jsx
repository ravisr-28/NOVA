import '../../styles/dashboard.css';

const StatCard = ({ icon: Icon, value, label, color = 'navy', onClick }) => {
  return (
    <div
      className={`stat-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={`stat-card-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div className="stat-card-info">
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
      </div>
    </div>
  );
};

export default StatCard;

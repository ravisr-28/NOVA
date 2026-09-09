import '../../styles/components.css';

const Badge = ({ children, variant = 'navy', size = 'sm', dot = false }) => {
  return (
    <span className={`badge badge-${size} badge-${variant}`}>
      {dot && <span className={`status-dot status-dot-${variant}`} />}
      {children}
    </span>
  );
};

export default Badge;

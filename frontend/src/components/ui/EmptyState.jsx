import { FolderOpen } from 'lucide-react';
import Button from './Button';
import '../../styles/components.css';

const EmptyState = ({
  icon: Icon = FolderOpen,
  title = 'Nothing here yet',
  message = '',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

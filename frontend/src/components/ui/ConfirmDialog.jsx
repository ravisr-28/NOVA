import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import '../../styles/components.css';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm"
      footer={
        <>
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="confirm-body">
        <div className="confirm-icon">
          <AlertTriangle size={24} />
        </div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;

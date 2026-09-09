import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: 'var(--sp-6)',
    }}>
      <div style={{
        fontSize: '120px',
        fontWeight: 700,
        fontFamily: 'var(--font-heading)',
        color: 'var(--color-gray-200)',
        lineHeight: 1,
        marginBottom: 'var(--sp-4)',
      }}>
        404
      </div>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '28px',
        color: 'var(--color-gray-800)',
        marginBottom: 'var(--sp-2)',
      }}>
        Page Not Found
      </h2>
      <p style={{
        color: 'var(--color-gray-500)',
        fontSize: '15px',
        marginBottom: 'var(--sp-6)',
        maxWidth: '400px',
      }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" icon={Home}>
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;

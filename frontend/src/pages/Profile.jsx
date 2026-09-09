import { useState } from 'react';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { formatDate } from '../utils/dateUtils';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setSaving(true);
    try {
      await api.put('/users/profile', { name: name.trim() });
      toast.success('Profile updated!');
      // Update localStorage
      const stored = JSON.parse(localStorage.getItem('nova_user') || '{}');
      stored.name = name.trim();
      localStorage.setItem('nova_user', JSON.stringify(stored));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">
      <h1 className="text-h1" style={{ marginBottom: 'var(--sp-6)' }}>Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <Avatar name={user?.name} avatar={user?.avatar} size="xl" />
          <div className="profile-header-info">
            <h2>{user?.name}</h2>
            <span className="profile-header-email">{user?.email}</span>
          </div>
        </div>

        <div className="profile-body">
          <form className="profile-form" onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label" htmlFor="profile-name">Full Name</label>
              <input
                id="profile-name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="profile-email">Email</label>
              <input
                id="profile-email"
                type="email"
                className="form-input"
                value={user?.email || ''}
                disabled
                style={{ opacity: 0.6 }}
              />
            </div>

            <Button variant="primary" size="md" icon={Save} loading={saving} type="submit">
              Save Changes
            </Button>
          </form>

          <div className="profile-joined">
            Joined {formatDate(user?.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

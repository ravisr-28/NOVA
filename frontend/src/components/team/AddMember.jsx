import { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import Modal from '../ui/Modal';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import api from '../../services/api';
import '../../styles/projects.css';

const AddMember = ({ isOpen, onClose, projectId, existingMemberIds = [], onMemberAdded }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState(null);

  const handleSearch = async (q) => {
    setQuery(q);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const res = await api.get(`/users/search?q=${encodeURIComponent(q)}`);
      // Filter out existing members
      const filtered = res.data.data.filter(
        (u) => !existingMemberIds.includes(u._id)
      );
      setResults(filtered);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async (userId) => {
    setAdding(userId);
    try {
      await api.post(`/projects/${projectId}/members`, { userId });
      onMemberAdded();
      // Remove from results
      setResults((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error('Add member failed:', err);
    } finally {
      setAdding(null);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add Team Member">
      <div className="add-member-search">
        <div className="form-group">
          <div style={{ position: 'relative' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-gray-400)',
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ paddingLeft: 36 }}
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="add-member-results">
        {searching && (
          <div style={{ textAlign: 'center', padding: 16, color: 'var(--color-gray-400)', fontSize: 13 }}>
            Searching...
          </div>
        )}

        {!searching && query.length >= 2 && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: 16, color: 'var(--color-gray-400)', fontSize: 13 }}>
            No users found
          </div>
        )}

        {results.map((user) => (
          <div key={user._id} className="add-member-item">
            <Avatar name={user.name} avatar={user.avatar} size="sm" />
            <div className="member-info">
              <div className="member-name">{user.name}</div>
              <div className="member-email">{user.email}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={UserPlus}
              loading={adding === user._id}
              onClick={() => handleAdd(user._id)}
            >
              Add
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AddMember;

import { X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import '../../styles/projects.css';

const MemberList = ({ members = [], ownerId, currentUserId, onRemove }) => {
  const isOwner = currentUserId === ownerId;

  return (
    <div>
      {members.map((member) => (
        <div key={member._id} className="member-item">
          <Avatar name={member.name} avatar={member.avatar} size="sm" />
          <div className="member-info">
            <div className="member-name">
              {member.name}
              {member._id === ownerId && (
                <span className="member-badge" style={{ marginLeft: 8 }}>Owner</span>
              )}
            </div>
            <div className="member-email">{member.email}</div>
          </div>
          {isOwner && member._id !== ownerId && (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              icon={X}
              onClick={() => onRemove(member._id)}
              title="Remove member"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberList;

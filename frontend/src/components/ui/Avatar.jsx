import '../../styles/components.css';

const Avatar = ({ name = '', avatar = '', size = 'md', className = '' }) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`avatar avatar-${size} ${className}`} title={name}>
      {avatar ? (
        <img src={avatar} alt={name} />
      ) : (
        initials || '?'
      )}
    </div>
  );
};

export default Avatar;

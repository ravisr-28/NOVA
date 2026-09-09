import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import '../../styles/navbar.css';

const pageTitles = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/profile': 'Profile',
};

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get page title from path
  const getTitle = () => {
    if (location.pathname.startsWith('/projects/')) return 'Project Details';
    return pageTitles[location.pathname] || 'NOVA';
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="navbar-hamburger" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <h2 className="navbar-title">{getTitle()}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-dropdown" ref={dropdownRef}>
          <button
            className="navbar-user-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar name={user?.name} avatar={user?.avatar} size="sm" />
            <span className="navbar-user-name">{user?.name?.split(' ')[0]}</span>
            <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="navbar-dropdown-menu">
              <button
                className="navbar-dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setDropdownOpen(false);
                }}
              >
                <User size={16} />
                Profile
              </button>
              <div className="navbar-dropdown-divider" />
              <button
                className="navbar-dropdown-item danger"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

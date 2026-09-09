import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import '../../styles/sidebar.css';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/projects', label: 'Projects', icon: FolderKanban },
];

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={onMobileClose} />}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">N</div>
          {!collapsed && (
            <h1>N<span>O</span>VA</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">
            {!collapsed && 'Menu'}
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={onMobileClose}
              >
                <Icon size={20} className="sidebar-link-icon" />
                {!collapsed && item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-divider" />

        {/* Toggle */}
        <button className="sidebar-toggle" onClick={onToggle}>
          {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
        </button>

        {/* User */}
        <div className="sidebar-user">
          <Avatar name={user?.name} avatar={user?.avatar} size="sm" />
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name}</div>
              <div className="sidebar-user-email">{user?.email}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

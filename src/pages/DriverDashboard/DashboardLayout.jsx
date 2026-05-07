import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarRange,
  Clock3,
  CarTaxiFront,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import './Dashboard.css';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const getLinkClass = ({ isActive }) =>
    `sidebar-link${isActive ? ' active' : ''}`;

  const menuItems = [
    { to: '/driver-dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/driver-dashboard/upcoming', label: 'Upcoming', icon: CarTaxiFront },
    { to: '/driver-dashboard/history', label: 'Trip History', icon: Clock3 },
    { to: '/driver-dashboard/calendar', label: 'Calendar', icon: CalendarRange }
  ];

  const handleDriverLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-shell">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-kicker">SERENDIB</span>
            <h3>Driver Portal</h3>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} end={end} to={to} className={getLinkClass}>
                <Icon size={16} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <NavLink to="/driver-dashboard/notifications" className={getLinkClass}>
              <Bell size={16} />
              <span>Notifications</span>
            </NavLink>
            <NavLink to="/driver-dashboard/settings" className={getLinkClass}>
              <Settings size={16} />
              <span>Settings</span>
            </NavLink>
            <button type="button" className="sidebar-link muted clickable" onClick={handleDriverLogout}>
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

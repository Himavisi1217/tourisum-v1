import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';

const DashboardLayout = () => {
  const getLinkClass = ({ isActive }) =>
    `sidebar-link${isActive ? ' active' : ''}`;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-kicker">Tourism</span>
          <h3>Driver Dashboard</h3>
          <p>Welcome back</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink end to="/driver-dashboard" className={getLinkClass}>
            Overview
          </NavLink>
          <NavLink to="/driver-dashboard/upcoming" className={getLinkClass}>
            Upcoming Trips
          </NavLink>
          <NavLink to="/driver-dashboard/history" className={getLinkClass}>
            Trip History
          </NavLink>
          <NavLink to="/driver-dashboard/calendar" className={getLinkClass}>
            Schedule Calendar
          </NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

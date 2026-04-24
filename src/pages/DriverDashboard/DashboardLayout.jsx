import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Driver Portal</h3>
        </div>
        <nav className="sidebar-nav">
          <Link to="/driver-dashboard" className="sidebar-link">Overview</Link>
          <Link to="/driver-dashboard/upcoming" className="sidebar-link">Upcoming Trips</Link>
          <Link to="/driver-dashboard/history" className="sidebar-link">Trip History</Link>
          <Link to="/driver-dashboard/calendar" className="sidebar-link">Schedule Calendar</Link>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="container section" style={{ maxWidth: '900px' }}>
      <h2>Admin Panel</h2>
      <p style={{ color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
        You are signed in as an admin. Publishing announcements and blogs is restricted to super admins.
      </p>
      <div className="card">
        <h3>Access Level</h3>
        <p>For content publishing and invite link generation, contact a super admin.</p>
        <Link to="/" className="btn-secondary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

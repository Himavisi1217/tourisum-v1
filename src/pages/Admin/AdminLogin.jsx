import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout, currentUser, userData } = useAuth();

  useEffect(() => {
    if (!currentUser || !userData) {
      return;
    }
    if (userData.role === 'super_admin') {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    if (userData.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    logout();
    setError('This account is not authorized for admin access.');
  }, [currentUser, logout, navigate, userData]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      await login(email, password);
    } catch (loginError) {
      setError('Failed to log in as admin. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '460px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
        <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>
          Manage announcements and blogs.
        </p>
        {error ? <p style={{ color: '#b91c1c', marginBottom: '1rem' }}>{error}</p> : null}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          <button className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in as Admin'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Have an invite link? <Link to="/portal-admin/signup">Create Admin Account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

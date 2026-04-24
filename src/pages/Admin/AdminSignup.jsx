import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';

const AdminSignup = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteReady, setInviteReady] = useState(false);
  const navigate = useNavigate();
  const { signupAdminWithInvite, userData } = useAuth();
  const { readAdminInvite } = useAppData();

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setError('Invite token is missing. Use the full temp signup link.');
        return;
      }
      const result = await readAdminInvite(token);
      if (!result.valid) {
        setError(result.reason);
        return;
      }
      setInviteReady(true);
    };

    validate();
  }, [readAdminInvite, token]);

  useEffect(() => {
    if (userData?.role === 'admin') {
      navigate('/admin/panel', { replace: true });
    }
    if (userData?.role === 'super_admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate, userData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signupAdminWithInvite(token, name, email, password);
      navigate('/admin/panel', { replace: true });
    } catch (signupError) {
      setError(signupError.message || 'Failed to create admin account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '480px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
        <h2 style={{ textAlign: 'center' }}>Admin Account Signup</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '1.5rem' }}>
          Create an admin account using a temporary invite link.
        </p>
        {error ? <p style={{ color: '#b91c1c', marginBottom: '1rem' }}>{error}</p> : null}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Full Name</label>
            <input value={name} onChange={(event) => setName(event.target.value)} required disabled={!inviteReady} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required disabled={!inviteReady} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required disabled={!inviteReady} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required disabled={!inviteReady} />
          </div>
          <button className="btn-primary" style={{ width: '100%' }} disabled={!inviteReady || loading}>
            {loading ? 'Creating admin account...' : 'Create Admin Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          Already have an account? <Link to="/portal-admin/login">Admin Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminSignup;

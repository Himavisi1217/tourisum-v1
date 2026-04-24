import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      // Wait a tiny bit for the context to fetch user data
      setTimeout(() => {
        navigate('/'); // Will redirect correctly in App.jsx based on role later, for now just go home or dashboard
      }, 500);
    } catch (err) {
      console.error(err);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '450px', margin: '0 auto', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card" style={{ width: '100%', padding: '2.5rem' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-darkest)' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>Sign in to continue your journey.</p>
        
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Don't have an account?</p>
          <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.95rem' }}>
            <Link to="/signup" style={{ color: 'var(--color-dark)', fontWeight: '600' }}>User Signup</Link>
            <span style={{ color: 'var(--color-light-medium)' }}>|</span>
            <Link to="/driver-signup" style={{ color: 'var(--color-dark)', fontWeight: '600' }}>Driver Signup</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

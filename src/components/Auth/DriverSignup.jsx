import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const DriverSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    vehicleType: '',
    vehicleCategory: 'Car',
    numberPlate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signupDriver, currentUser, userData } = useAuth();

  useEffect(() => {
    if (currentUser && userData?.role === 'driver') {
      navigate('/driver-dashboard', { replace: true });
    }
  }, [currentUser, navigate, userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      
      const driverData = {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        vehicleType: formData.vehicleType,
        vehicleCategory: formData.vehicleCategory,
        numberPlate: formData.numberPlate,
        status: 'pending_approval'
      };

      await signupDriver(formData.email, formData.password, driverData);
    } catch (err) {
      console.error(err);
      setError('Failed to create driver account. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card" style={{ width: '100%', padding: '2.5rem' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-darkest)' }}>Driver Partner Signup</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>Join our fleet and start earning.</p>
        
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSignup}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Mobile Number</label>
              <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-input-border)', margin: '2rem 0' }} />
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Vehicle Details</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label>Vehicle Category</label>
              <select name="vehicleCategory" value={formData.vehicleCategory} onChange={handleChange} required>
                <option value="Car">Car</option>
                <option value="Van">Van</option>
                <option value="SUV">SUV</option>
                <option value="Jeep">Jeep</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label>Vehicle Make & Model (e.g., Toyota Prius)</label>
              <input type="text" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label>Number Plate</label>
            <input type="text" name="numberPlate" value={formData.numberPlate} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Register as Driver'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>Already a driver?</p>
          <div style={{ marginTop: '0.75rem' }}>
            <Link to="/login" style={{ color: 'var(--color-dark)', fontWeight: '600' }}>Log In here</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DriverSignup;

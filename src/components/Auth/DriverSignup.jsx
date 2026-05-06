import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { motion } from 'framer-motion';

const DriverSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    vehicleType: '',
    vehicleCategory: 'Car',
    numberPlate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();
  const { submitDriverRequest } = useAppData();

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

    try {
      setError('');
      setLoading(true);
      
      const requestData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        vehicleType: formData.vehicleType,
        vehicleCategory: formData.vehicleCategory,
        numberPlate: formData.numberPlate
      };

      await submitDriverRequest(requestData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit driver request. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card"
          style={{ textAlign: 'center', padding: '3rem 2rem' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: 'var(--color-darkest)', marginBottom: '0.75rem' }}>Request Submitted!</h2>
          <p style={{ color: 'var(--color-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
            Your driver registration request has been submitted successfully. Our admin team will review your application and get back to you shortly. You'll receive further instructions via your email <strong>{formData.email}</strong>.
          </p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '0.75rem 2rem' }}>
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card" style={{ width: '100%', padding: '2.5rem' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--color-darkest)' }}>Driver Partner Signup</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: '2rem' }}>Submit your details for review. Our team will approve your request.</p>
        
        {error && <div style={{ backgroundColor: 'var(--color-error-bg)', color: 'var(--color-error)', padding: '0.75rem', borderRadius: 'var(--border-radius-md)', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

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
            {loading ? 'Submitting request...' : 'Submit Driver Request'}
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

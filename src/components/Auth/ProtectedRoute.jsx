import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }
  
  if (!currentUser) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required, check it
  if (requiredRole && userData) {
    if (userData.role !== requiredRole) {
      // User does not have permission, redirect to home
      return <Navigate to="/" replace />;
    }
  }

  // If user is logged in and role matches (or no role required), render component
  return children;
};

export default ProtectedRoute;

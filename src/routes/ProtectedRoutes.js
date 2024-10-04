// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/Authentication';

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login page
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected route if authenticated
};

export default ProtectedRoute;

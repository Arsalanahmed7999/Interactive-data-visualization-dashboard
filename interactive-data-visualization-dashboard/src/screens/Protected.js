// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../networks/AuthProvider';

const ProtectedRoute = ({ element }) => {
  const { authToken } = useAuth();
  if (!authToken) {
   return <Navigate to="/login" />;
  }
  return element;
};
export default ProtectedRoute;
    
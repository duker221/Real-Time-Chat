import React from 'react';
import { Navigate } from 'react-router-dom';
import routes from '../routes';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={routes.loginPage} />;
  }

  return children;
};

export default ProtectedRoute;

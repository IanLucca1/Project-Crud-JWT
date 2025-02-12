import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, admin }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null; 

  if (!token) {
    return <Navigate to="/" />; 
  }

  if (admin && user?.role !== 'admin') {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;

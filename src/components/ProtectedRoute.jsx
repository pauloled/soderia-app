import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from '../store/useStore';

const ProtectedRoute = ({ children }) => {
  const { usuario } = useStore();

  // Si no hay un usuario logueado, redirige al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario logueado, muestra el componente hijo
  return children;
};

export default ProtectedRoute;

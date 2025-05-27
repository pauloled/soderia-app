// src/router/AppRouter.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import Ventas from '../pages/Ventas';
import Clientes from '../pages/Clientes';
import Admin from '../pages/Admin';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Páginas protegidas */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
      <Route path="/ventas" element={<ProtectedRoute><Ventas /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

      {/* Ruta por defecto (404 o redirección a landing/login) */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRouter;

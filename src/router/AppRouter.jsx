import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import Productos from '../pages/Productos';
import Ventas from '../pages/Ventas';
import Clientes from '../pages/Clientes';
import Admin from '../pages/Admin';
import Cliente from '../pages/Clientes'; // 👉 Asegurate que la ruta esté bien
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Páginas protegidas */}
          <Route path="/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
      <Route path="/ventas" element={<ProtectedRoute><Ventas /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/cliente" element={<ProtectedRoute><Cliente /></ProtectedRoute>} /> {/* ✅ RUTA AGREGADA */}

      {/* Ruta por defecto */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRouter;

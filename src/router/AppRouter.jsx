import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import Ventas from '../pages/Ventas';
import Clientes from '../pages/Clientes';
import Admin from '../pages/Admin';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/Productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
      <Route path="/Ventas" element={<ProtectedRoute><Ventas /></ProtectedRoute>} />
      <Route path="/Clientes" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
      <Route path="/Admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      {/* Podés agregar una ruta por defecto */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
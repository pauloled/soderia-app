import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Productos from '../pages/Productos'
import Ventas from '../pages/Ventas'
import Clientes from '../pages/Clientes'
import Admin from '../pages/Admin'
import useStore from '../store/useStore'

const ProtectedRoute = ({ children, role }) => {
  const { usuario, rol } = useStore();
  if (!usuario) return <Navigate to="/login" />;
  if (role && rol !== role) return <Navigate to="/" />;
  return children;
};

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/ventas" element={<ProtectedRoute role="admin"><Ventas /></ProtectedRoute>} />
    <Route path="/clientes" element={<ProtectedRoute role="admin"><Clientes /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute role="admin"><Admin /></ProtectedRoute>} />
  </Routes>
)

export default AppRouter
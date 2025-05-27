import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';
import '../styles/Navbar.css';

const Navbar = () => {
  const rol = useStore((state) => state.rol);

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li><Link to="/home">Inicio</Link></li>

        {rol === 'cliente' && (
          <>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/ventas">Mis Pedidos</Link></li>
          </>
        )}

        {(rol === 'admin' || rol === 'empleado') && (
          <>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/ventas">Ventas</Link></li>
            {rol === 'admin' && <li><Link to="/admin">Usuarios</Link></li>}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
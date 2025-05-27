import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const rol = useStore((state) => state.rol);
  const usuario = useStore((state) => state.usuario);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">Sodería</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {(rol === 'cliente') && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/ventas">Mis Pedidos</Link></li>
              </>
            )}

            {(rol === 'admin' || rol === 'empleado') && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/ventas">Ventas</Link></li>
                {rol === 'admin' && <li className="nav-item"><Link className="nav-link" to="/admin">Usuarios</Link></li>}
              </>
            )}
          </ul>

          <span className="navbar-text me-3">Hola, {usuario}</span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
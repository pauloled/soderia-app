import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import Navbar from '../components/Navbar';

const Home = () => {
  const usuario = useStore((state) => state.usuario);
  const rol = useStore((state) => state.rol);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-3">Bienvenidos a la Sodería</h1>

        <p>
          Hola, <strong>{usuario}</strong>. Estás logueado como <em>{rol}</em>.
        </p>

        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <div className="row">
          {/* Para clientes */}
          {(rol === 'cliente') && (
            <div className="col-md-6">
              <h3>Productos</h3>
              <p>Consulta el catálogo de productos disponibles.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/productos')}
              >
                Ver Productos
              </button>

              <h3 className="mt-4">Mis Pedidos</h3>
              <p>Consulta tus pedidos y estado de tus compras.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/ventas')}
              >
                Ver Mis Pedidos
              </button>
            </div>
          )}

          {/* Para empleados o admin */}
          {(rol === 'admin' || rol === 'empleado') && (
            <div className="col-md-8">
              <h3>Gestión</h3>

              <ul className="list-group">
                <li className="list-group-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/productos')}
                  >
                    Gestión de Productos
                  </button>
                </li>

                <li className="list-group-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/clientes')}
                  >
                    Gestión de Clientes
                  </button>
                </li>

                <li className="list-group-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate('/ventas')}
                  >
                    Gestión de Ventas
                  </button>
                </li>

                {rol === 'admin' && (
                  <li className="list-group-item">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => navigate('/admin')}
                    >
                      Administración de Usuarios
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
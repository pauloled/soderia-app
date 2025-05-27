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

      {/* Contenedor full screen con padding y fondo celeste */}
      <div
        style={{
          backgroundColor: '#e6f2ff',
          minHeight: '100vh',   // que ocupe toda la altura visible
          width: '100vw',       // que ocupe todo el ancho
          padding: '2rem 1rem', // padding interno para que no quede pegado
          boxSizing: 'border-box', // para que el padding no aumente el ancho total
          display: 'flex',
          justifyContent: 'center', // para centrar el contenido horizontalmente
        }}
      >
        {/* Contenedor interior con ancho máximo */}
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          {/* Título grande y centrado */}
          <header
            className="text-center mb-4 p-3 rounded"
            style={{
              backgroundColor: '#cce7ff',
              color: '#003366',
              fontWeight: '900',
              fontSize: '3rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            SODERÍA LOS GUTIERREZ
          </header>

          {/* Bienvenida + logout alineados y estilizados */}
          <section
            className="text-center mb-5 p-3 rounded"
            style={{
              backgroundColor: '#d9eefa',
              color: '#003366',
              fontSize: '1.25rem',
              fontWeight: '600',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <p>
              Bienvenido/a, <strong>{usuario}</strong>. Estás logueado como{' '}
              <em>{rol}</em>.
            </p>
            <button
              className="btn"
              onClick={handleLogout}
              style={{
                backgroundColor: '#00509e',
                color: 'white',
                fontWeight: '600',
                padding: '0.5rem 1.5rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#003366')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#00509e')}
            >
              Cerrar sesión
            </button>
          </section>

          {/* Contenido específico según rol */}
          <div className="row">
            {/* Para clientes */}
            {rol === 'cliente' && (
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
      </div>
    </>
  );
};

export default Home;
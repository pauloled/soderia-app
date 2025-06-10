import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import Navbar from '../components/Navbar';

const Admin = () => {
  const usuario = useStore((state) => state.usuario);
  const rol = useStore((state) => state.rol);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Si usuario no está cargado, no renderizar nada (evita errores)
  if (!usuario) return null;

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: '#e6f2ff',
          minHeight: '100vh',
          width: '100vw',
          padding: '2rem 1rem',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%' }}>
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
            ADMINISTRACIÓN
          </header>

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
              Bienvenido/a, <strong>{usuario?.usuario}</strong>. Estás logueado como{' '}
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
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = '#003366')
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = '#00509e')
              }
            >
              Cerrar sesión
            </button>
          </section>

          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h3>Panel de Gestión</h3>
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
                    onClick={() => navigate('/usuarios')}
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
                <li className="list-group-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => navigate('/admin')}
                  >
                    Administración de Usuarios
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
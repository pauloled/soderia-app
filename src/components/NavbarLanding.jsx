import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png';
import '../styles/Navbar.css'; // asegúrate de que la ruta sea correcta

const NavbarLanding = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar fixed-top w-100">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo Sodería" className="logo me-2" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link" href="#nosotros">Nosotros</a></li>
            <li className="nav-item"><a className="nav-link" href="#productos">Productos</a></li>
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
            <li className="nav-item">
              <button className="btn btn-outline-dark ms-3" onClick={() => navigate('/login')}>
                Iniciar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
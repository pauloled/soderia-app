import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png'; // usamos el logo con fondo transparente
import '../styles/navbar.css'; // asegurate de importar el CSS si no lo hacías

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo Sodería" className="logo" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => navigate('/')}>
                Home
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

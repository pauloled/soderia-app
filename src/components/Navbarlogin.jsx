import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ajustá la ruta si es diferente
import '../styles/Navbarlogin.css';   // Asegurate de crear este archivo

const NavbarLogin = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar NavbarLogin d-flex justify-content-between align-items-center px-4 py-2">
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo Sodería" className="logo-login" />
      </div>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Home
      </button>
    </nav>
  );
};

export default NavbarLogin;

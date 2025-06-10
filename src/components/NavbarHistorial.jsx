import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import useStore from "../store/useStore";

const NavbarHistorial = () => {
  const navigate = useNavigate();
  const { usuario, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar" style={{ width: '100vw', left: 0, right: 0, backgroundColor: '#d3d3d3', padding: 0, margin: 0, position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container-fluid d-flex align-items-center justify-content-between" style={{ padding: '0 1rem', margin: 0, width: '100%' }}>
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => navigate('/admin')} style={{cursor:'pointer'}}>
          <img src={logo} alt="Logo Sodería" className="logo" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav d-flex align-items-center gap-2">
            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => navigate('/admin')}>
                Home
              </button>
            </li>
            <li className="nav-item text-black px-2">👤 {usuario?.usuario}</li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHistorial;

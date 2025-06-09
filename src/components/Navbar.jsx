import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png";
import "../styles/navbar.css";
import useStore from "../store/useStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { usuario, rol, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Logo Sodería" className="logo" />
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav d-flex align-items-center gap-2">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => navigate("/")}>
                Home
              </button>
            </li>
            {rol === "admin" && (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={() => navigate("/productos")}>
                    Productos
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={() => navigate("/ventas")}>
                    Ventas
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={() => navigate("/clientes")}>
                    Clientes
                  </button>
                </li>
              </>
            )}
            {usuario && (
              <>
                <li className="nav-item text-white px-2">👤 {usuario}</li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
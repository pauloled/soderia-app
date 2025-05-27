import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

const Navbar = () => {
  const { usuario, rol, logout } = useStore()
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Sodería</Link>
      <Link className="nav-link" to="/productos">Productos</Link>
      {rol === 'admin' && <>
        <Link className="nav-link" to="/ventas">Ventas</Link>
        <Link className="nav-link" to="/clientes">Clientes</Link>
      </>}
      {!usuario ? (
        <Link className="nav-link" to="/login">Login</Link>
      ) : (
        <button className="btn btn-danger ms-auto" onClick={logout}>Cerrar sesión</button>
      )}
    </nav>
  )
}

export default Navbar
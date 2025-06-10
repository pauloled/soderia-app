import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import '../styles/login.css';          // ⬅️  importa los estilos
import Navbarlogin from "../components/Navbarlogin.jsx";
import videoFondo from '../assets/agua.mp4'; 

const Login = () => {
  const [form, setForm]   = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');
  const login             = useStore((state) => state.login);
  const navigate          = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.get('http://localhost:3000/usuarios');
    const usuarioEncontrado = data.find(
      (u) => u.usuario === form.usuario && u.password === form.password
    );

    if (usuarioEncontrado) {
      login(usuarioEncontrado.usuario, usuarioEncontrado.rol);

      // 🔁 Redirige según el rol
      if (usuarioEncontrado.rol === 'admin') {
        navigate('/admin');
      } else if (usuarioEncontrado.rol === 'cliente') {
        navigate('/cliente');
      } else {
        navigate('/home'); // fallback si querés agregar más roles
      }

    } else {
      setError('Usuario o contraseña incorrectos');
    }
  } catch (err) {
    console.error(err);
    setError('Error en la conexión');
  }
};

  return (
    <>
      <Navbarlogin />
      <div className="login-bg d-flex justify-content-center align-items-center">
        <video className="video-bgl" src={videoFondo} autoPlay muted loop playsInline />
          <div className="video-overlay"></div>
        <div className="login-card shadow">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="usuario"
                className="form-control"
                placeholder="Usuario"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Ingresar
            </button>
            <button
              type="button"
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate('/registro')}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
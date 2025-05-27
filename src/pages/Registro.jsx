// src/Pages/registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useAPI';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registro = () => {
  const [form, setForm] = useState({
    usuario: '',
    password: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const navigate = useNavigate();
  const { post } = useApi();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Registrar como usuario en "usuarios"
      await post('usuarios', {
        usuario: form.usuario,
        password: form.password,
        rol: 'cliente',
      });

      // 2. Registrar datos extra en "clientes" (opcional)
      await post('clientes', {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        usuario: form.usuario,
      });

      alert('¡Registro exitoso! Ahora podés iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario y cliente:', error);
      alert('Hubo un error durante el registro.');
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Registro de Cliente</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label>Nombre completo</label>
          <input type="text" className="form-control" name="nombre" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input type="email" className="form-control" name="email" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" className="form-control" name="telefono" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Dirección</label>
          <input type="text" className="form-control" name="direccion" required onChange={handleChange} />
        </div>
        <hr />
        <div className="mb-3">
          <label>Nombre de usuario</label>
          <input type="text" className="form-control" name="usuario" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" name="password" required onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-success w-100">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;

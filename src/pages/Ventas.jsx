import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    cliente: '',
    producto: '',
    cantidad: ''
  });

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ventas');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al obtener ventas', error);
    }
  };

  const handleChange = (e) => {
    setNuevaVenta({
      ...nuevaVenta,
      [e.target.name]: e.target.value
    });
  };

  const agregarVenta = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/ventas', nuevaVenta);
      setNuevaVenta({ cliente: '', producto: '', cantidad: '' });
      obtenerVentas();
    } catch (error) {
      console.error('Error al agregar venta', error);
    }
  };

  return (
    <div>
      <h2>Ventas</h2>
      <form onSubmit={agregarVenta}>
        <input
          type="text"
          name="cliente"
          value={nuevaVenta.cliente}
          onChange={handleChange}
          placeholder="Cliente"
          required
        />
        <input
          type="text"
          name="producto"
          value={nuevaVenta.producto}
          onChange={handleChange}
          placeholder="Producto"
          required
        />
        <input
          type="number"
          name="cantidad"
          value={nuevaVenta.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          required
        />
        <button type="submit">Agregar Venta</button>
      </form>

      <ul>
        {ventas.map((venta) => (
          <li key={venta.id}>
            Cliente: {venta.cliente} - Producto: {venta.producto} - Cantidad: {venta.cantidad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ventas;
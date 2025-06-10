import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import NavbarMisPedidos from '../components/NavbarMisPedidos.jsx';
import { useNavigate } from "react-router-dom";

const MisPedidos = () => {
  const { usuario } = useStore();
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchVentas = async () => {
    const res = await axios.get("http://localhost:3000/ventas");
    // Filtrar ventas por el usuario logueado (por username)
    setVentas(res.data.filter(v => v.usuario === usuario?.usuario));
  };
  fetchVentas();
}, [usuario]);

  return (
    <>
      <NavbarMisPedidos />
      <div className="container mt-4">
        <h2 className="text-primary fw-bold">Mis Pedidos</h2>
        <button
          className="btn btn-success mb-3"
          onClick={() => navigate(`/cliente#${usuario?.usuario || ''}`)}
        >
          Comprar
        </button>
        {ventas.length === 0 ? (
          <p>No tienes pedidos realizados.</p>
        ) : (
          <table className="table table-bordered table-striped table-hover mt-2">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.fecha}</td>
                  <td>
                    {venta.productos.map((p, i) => (
                      <div key={i}>
                        {p.nombre} x{p.cantidad}
                      </div>
                    ))}
                  </td>
                  <td>${venta.total}</td>
                  <td>{venta.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MisPedidos;
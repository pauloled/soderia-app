import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarHistorial from "../components/NavbarHistorial.jsx";
import { useParams } from "react-router-dom";

const HistorialUsuario = () => {
  const { usuarioId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [usuariosRes, clientesRes, ventasRes] = await Promise.all([
        axios.get("http://localhost:3000/usuarios"),
        axios.get("http://localhost:3000/clientes"),
        axios.get("http://localhost:3000/ventas"),
      ]);
      setUsuario(usuariosRes.data.find((u) => u.usuario === usuarioId));
      setCliente(clientesRes.data.find((c) => c.usuario === usuarioId));
      setVentas(ventasRes.data.filter((v) => v.usuario === usuarioId));
    };
    fetchAll();
  }, [usuarioId]);

  const cambiarEstado = async (ventaId, nuevoEstado) => {
    await axios.patch(`http://localhost:3000/ventas/${ventaId}`, {
      estado: nuevoEstado,
    });
    setVentas((prev) =>
      prev.map((v) =>
        v.id === ventaId ? { ...v, estado: nuevoEstado } : v
      )
    );
  };

  if (!usuario) return null;

  return (
    <>
      <NavbarHistorial />
      <div className="container mt-4">
        <h2 className="fw-bold mb-3">Historial de {usuario.usuario}</h2>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-2">Datos personales</h5>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Nombre:</strong> {cliente?.nombre || "-"}
              </li>
              <li className="list-group-item">
                <strong>Email:</strong> {cliente?.email || "-"}
              </li>
              <li className="list-group-item">
                <strong>Domicilio:</strong> {cliente?.direccion || "-"}
              </li>
              <li className="list-group-item">
                <strong>Celular:</strong> {cliente?.telefono || "-"}
              </li>
            </ul>
          </div>
        </div>
        <h4>Compras realizadas</h4>
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
                <td>
                  <select
                    className="form-select"
                    value={venta.estado}
                    onChange={(e) =>
                      cambiarEstado(venta.id, e.target.value)
                    }
                  >
                    <option value="pendiente">pendiente</option>
                    <option value="completada">completada</option>
                  </select>
                </td>
              </tr>
            ))}
            {ventas.length === 0 && (
              <tr>
                <td colSpan={5}>No hay compras registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HistorialUsuario;
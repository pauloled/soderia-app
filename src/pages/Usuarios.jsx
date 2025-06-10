import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const [usuariosRes, clientesRes, ventasRes] = await Promise.all([
        axios.get("http://localhost:3000/usuarios"),
        axios.get("http://localhost:3000/clientes"),
        axios.get("http://localhost:3000/ventas"),
      ]);
      setUsuarios(usuariosRes.data);
      setClientes(clientesRes.data);
      setVentas(ventasRes.data);
    };
    fetchAll();
  }, []);

  // Calcula ventas pendientes por usuario
  const usuariosConPendientes = usuarios
    .filter((u) => u.rol === "cliente")
    .map((u) => {
      const pendientes = ventas.filter(
        (v) => v.usuario === u.usuario && v.estado === "pendiente"
      ).length;
      const cliente = clientes.find((c) => c.usuario === u.usuario);
      return {
        ...u,
        pendientes,
        nombre: cliente?.nombre || "",
      };
    })
    .sort((a, b) => b.pendientes - a.pendientes);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Gestor de Usuarios</h2>
        <div className="row">
          {usuariosConPendientes.map((u) => (
            <div className="col-md-4 mb-3" key={u.usuario}>
              <div
                className="card shadow-sm p-3 d-flex flex-row align-items-center justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/usuarios/${u.usuario}`)}
              >
                <div>
                  <h5 className="mb-0">{u.usuario}</h5>
                  <small className="text-muted">{u.nombre}</small>
                </div>
                <span
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: u.pendientes > 0 ? "#dc3545" : "#198754",
                    color: "white",
                    fontSize: "1.2rem",
                    minWidth: "2.5rem",
                  }}
                >
                  {u.pendientes}
                </span>
              </div>
            </div>
          ))}
          {usuariosConPendientes.length === 0 && (
            <div className="col-12">
              <p>No hay usuarios clientes registrados.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Usuarios;
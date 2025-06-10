import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import Navbar from "../components/Navbar";

const Ventas = () => {
  const { productos, fetchProductos } = useStore();
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // NUEVO: lista de usuarios
  const [cliente, setCliente] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    fetchProductos();
    fetchVentas();
    fetchUsuarios();
  }, []);

  const fetchVentas = async () => {
    const res = await axios.get("http://localhost:3000/ventas");
    setVentas(res.data);
  };

  // NUEVO: obtener usuarios reales
  const fetchUsuarios = async () => {
    const res = await axios.get("http://localhost:3000/usuarios");
    setUsuarios(res.data);
  };

  const agregarProducto = () => {
    if (!productoSeleccionado || cantidad <= 0 || isNaN(cantidad)) return;

    const prod = productos.find((p) => p.nombre === productoSeleccionado);
    if (!prod) return;

    if (prod.stock < cantidad) {
      alert("Stock insuficiente");
      return;
    }

    setProductosSeleccionados((prev) => [
      ...prev,
      { ...prod, cantidad: Number(cantidad) },
    ]);
    setCantidad(1);
    setProductoSeleccionado("");
  };

  const eliminarProductoDelCarrito = (id) => {
    setProductosSeleccionados((prev) => prev.filter((p) => p.id !== id));
  };

  const confirmarVenta = async () => {
    if (!cliente || productosSeleccionados.length === 0) return;

    const total = productosSeleccionados.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );

    const nuevaVenta = {
      fecha: new Date().toISOString().split("T")[0],
      usuario: cliente, // ahora es el username real
      productos: productosSeleccionados.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
      })),
      total,
      estado: "pendiente",
    };

    await axios.post("http://localhost:3000/ventas", nuevaVenta);

    for (const prod of productosSeleccionados) {
      const nuevoStock = prod.stock - prod.cantidad;
      await axios.patch(`http://localhost:3000/productos/${prod.id}`, {
        stock: nuevoStock,
      });
    }

    setProductosSeleccionados([]);
    setCliente("");
    fetchVentas();
    fetchProductos();
  };

  const eliminarVenta = async (id) => {
    await axios.delete(`http://localhost:3000/ventas/${id}`);
    fetchVentas();
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await axios.patch(`http://localhost:3000/ventas/${id}`, {
        estado: nuevoEstado,
      });
      fetchVentas();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-primary fw-bold">Gestión de Ventas</h2>

        <div className="d-flex gap-2 my-3">
          <select
            className="form-select"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          >
            <option value="">Seleccione cliente</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.usuario}>
                {u.usuario} {u.nombre ? `- ${u.nombre}` : ""}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.id} value={p.nombre}>
                {p.categoria} - {p.nombre} (${p.precio}) - Stock: {p.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-control"
            value={cantidad}
            min={1}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setCantidad(isNaN(val) ? "" : val);
            }}
          />

          <button className="btn btn-primary" onClick={agregarProducto}>
            Agregar Venta
          </button>
        </div>

        {/* Carrito de productos seleccionados */}
        {productosSeleccionados.length > 0 && (
          <div className="mb-4">
            <h5>Carrito de venta</h5>
            {productosSeleccionados.map((p, i) => {
              const stockSuficiente = p.stock >= p.cantidad;
              return (
                <div
                  key={i}
                  className={`alert d-flex justify-content-between align-items-center ${
                    stockSuficiente ? "alert-success" : "alert-danger"
                  } fw-bold`}
                >
                  <span>
                    {p.categoria} - {p.nombre} - Cantidad: {p.cantidad} - Stock{" "}
                    {stockSuficiente ? "suficiente" : "insuficiente"}
                  </span>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => eliminarProductoDelCarrito(p.id)}
                  >
                    X
                  </button>
                </div>
              );
            })}
            <div className="fw-bold text-end mb-2">
              Total: ${productosSeleccionados.reduce((sum, p) => sum + p.precio * p.cantidad, 0)}
            </div>
            <button className="btn btn-success mb-4" onClick={confirmarVenta}>
              Confirmar Venta
            </button>
          </div>
        )}

        <h3>Ventas realizadas</h3>
        <table className="table table-bordered table-striped table-hover mt-2">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fecha}</td>
                <td>{venta.usuario}</td>
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
                    value={venta.estado || "pendiente"}
                    onChange={(e) =>
                      cambiarEstado(venta.id, e.target.value)
                    }
                  >
                    <option value="pendiente">pendiente</option>
                    <option value="completada">completada</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarVenta(venta.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ventas;
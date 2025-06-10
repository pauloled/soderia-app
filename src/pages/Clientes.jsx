import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import NavbarCliente from '../components/NavbarCliente.jsx';
import { useNavigate } from "react-router-dom";

const Cliente = () => {
  const { productos, fetchProductos, usuario } = useStore();
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const cantidad = parseInt(cantidades[producto.id]) || 0;
    if (cantidad <= 0 || cantidad > producto.stock) {
      alert("Cantidad inválida o sin stock suficiente.");
      return;
    }

    setCarrito((prev) => [
      ...prev,
      { ...producto, cantidad }
    ]);

    setCantidades((prev) => ({ ...prev, [producto.id]: "" }));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const comprar = async () => {
    if (carrito.length === 0) return;

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const nuevaVenta = {
      fecha: new Date().toISOString().split("T")[0],
      usuario: usuario?.usuario || "cliente",
      productos: carrito.map((p) => ({
        nombre: p.nombre,
        cantidad: p.cantidad
      })),
      total,
      estado: "pendiente"
    };

    await axios.post("http://localhost:3000/ventas", nuevaVenta);

    for (const prod of carrito) {
      const nuevoStock = prod.stock - prod.cantidad;
      await axios.patch(`http://localhost:3000/productos/${prod.id}`, {
        stock: nuevoStock,
      });
    }

    setCarrito([]);
    fetchProductos();
    alert("¡Compra realizada!");
  };

  // Si usuario no está cargado, no renderizar nada (evita errores)
  if (!usuario) return null;

  const totalCarrito = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <>
      <NavbarCliente />
      <div className="container mt-4">
        <button
          className="btn btn-info mb-3"
          onClick={() => navigate("/mis-pedidos")}
        >
          Mis pedidos
        </button>

        <h2 className="text-primary fw-bold">
          Bienvenido/a, {usuario?.usuario || "Cliente"}
        </h2>

        {/* Carrito en tarjeta destacada */}
        {carrito.length > 0 && (
          <div className="row mb-4">
            <div className="col-md-6 offset-md-3">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Carrito</h4>
                </div>
                <div className="card-body">
                  {carrito.map((p, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-center border-bottom py-2"
                    >
                      <span>
                        <strong>{p.nombre}</strong> (${p.precio} c/u) - Cantidad: {p.cantidad} 
                        (<span className="text-success">${p.precio * p.cantidad}</span>)
                      </span>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => eliminarDelCarrito(p.id)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <div className="mt-3">
                    <div className="card bg-success text-white">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <span className="fw-bold">Total acumulado:</span>
                        <span className="fw-bold fs-5">${totalCarrito}</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-success mt-3 w-100" onClick={comprar}>
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <h4 className="mt-4">Productos disponibles</h4>
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">Precio: ${producto.precio}</p>
                  <p className="card-text">Stock: {producto.stock}</p>
                  <input
                    type="number"
                    min={1}
                    max={producto.stock}
                    className="form-control mb-2"
                    placeholder="Cantidad"
                    value={cantidades[producto.id] || ""}
                    onChange={(e) =>
                      setCantidades((prev) => ({
                        ...prev,
                        [producto.id]: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => agregarAlCarrito(producto)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cliente;
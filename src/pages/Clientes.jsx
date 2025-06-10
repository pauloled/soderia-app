import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import Navbar from "../components/Navbar";

const Cliente = () => {
  const { productos, fetchProductos, usuario } = useStore();
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});

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
      usuario: usuario?.nombre || "cliente",
      cliente: usuario?.nombre || "cliente",
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
        stock: nuevoStock
      });
    }

    setCarrito([]);
    fetchProductos();
    alert("¡Compra realizada con éxito!");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-primary fw-bold">Bienvenido/a, {usuario?.nombre || "Cliente"}</h2>

        {/* Carrito arriba */}
        {carrito.length > 0 && (
          <div className="mb-4">
            <h4>Carrito</h4>
            {carrito.map((p, i) => (
              <div key={i} className="alert alert-secondary d-flex justify-content-between align-items-center">
                <strong>{p.nombre}</strong> - Cantidad: {p.cantidad}
                <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(p.id)}>X</button>
              </div>
            ))}
            <button className="btn btn-success" onClick={comprar}>Comprar</button>
          </div>
        )}

        <h4>Productos disponibles</h4>
        <div className="row">
          {productos.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <div className="card">
                <img
                  src={p.imagen || "https://via.placeholder.com/150"}
                  className="card-img-top"
                  alt={p.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text">${p.precio}</p>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Cantidad"
                    value={cantidades[p.id] || ""}
                    onChange={(e) =>
                      setCantidades({
                        ...cantidades,
                        [p.id]: e.target.value
                      })
                    }
                  />
                  <button className="btn btn-primary" onClick={() => agregarAlCarrito(p)}>
                    +
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
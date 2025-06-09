import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Productos.css';

const Productos = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/productos');
      setProductos(res.data);
    } catch (err) {
      console.error('Error al obtener productos:', err);
    }
  };

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProducto((prev) => ({ ...prev, imagen: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

      const nuevoProducto = { id: nuevoId, ...producto };

      await axios.post('http://localhost:3000/productos', nuevoProducto);

      setProducto({ nombre: '', precio: '', stock: '', imagen: '' });
      obtenerProductos();
      alert('Producto agregado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al crear producto');
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      obtenerProductos();
    } catch (err) {
      console.error('Error al eliminar producto:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="tituloprod">Gestión de Productos</h2>

      {/* Formulario para agregar producto */}
      <div className="card mb-5">
        <div className="card-header">Agregar nuevo producto</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre del producto"
                  value={producto.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  placeholder="Precio"
                  value={producto.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  placeholder="Stock"
                  value={producto.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary w-100" type="submit">Agregar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.stock}</td>
                <td>
                  {prod.imagen && (
                    <img src={prod.imagen} alt={prod.nombre} width="60" />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="6">No hay productos cargados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;

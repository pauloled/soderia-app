import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/Productos.css';

const Productos = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: ''
  });

  const [productos, setProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [editData, setEditData] = useState({});
  const [reponerId, setReponerId] = useState(null);
  const [reponerCantidad, setReponerCantidad] = useState('');

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

  const handleImageUpload = (e, setState) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setState((prev) => ({ ...prev, imagen: reader.result }));
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

  // --- REPOSICIÓN DE STOCK ---
  const handleReponer = async (id) => {
    const prod = productos.find((p) => p.id === id);
    if (!prod || isNaN(Number(reponerCantidad)) || Number(reponerCantidad) <= 0) return;
    const nuevoStock = Number(prod.stock) + Number(reponerCantidad);
    await axios.patch(`http://localhost:3000/productos/${id}`, { stock: nuevoStock });
    setReponerId(null);
    setReponerCantidad('');
    obtenerProductos();
  };

  // --- EDICIÓN DE PRODUCTO ---
  const handleEditClick = (prod) => {
    setEditandoId(prod.id);
    setEditData({ ...prod });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImage = (e) => {
    handleImageUpload(e, setEditData);
  };

  const handleEditSave = async (id) => {
    await axios.patch(`http://localhost:3000/productos/${id}`, editData);
    setEditandoId(null);
    obtenerProductos();
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Gestión de Productos</h2>

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
                    onChange={(e) => handleImageUpload(e, setProducto)}
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
                  <td>
                    {editandoId === prod.id ? (
                      <input
                        type="text"
                        name="nombre"
                        value={editData.nombre}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    ) : (
                      prod.nombre
                    )}
                  </td>
                  <td>
                    {editandoId === prod.id ? (
                      <input
                        type="number"
                        name="precio"
                        value={editData.precio}
                        onChange={handleEditChange}
                        className="form-control"
                      />
                    ) : (
                      `$${prod.precio}`
                    )}
                  </td>
                  <td>
                    {prod.stock}
                    {reponerId === prod.id ? (
                      <div className="d-flex mt-2">
                        <input
                          type="number"
                          min={1}
                          className="form-control"
                          style={{ width: "80px" }}
                          value={reponerCantidad}
                          onChange={(e) => setReponerCantidad(e.target.value)}
                        />
                        <button
                          className="btn btn-success btn-sm ms-2"
                          onClick={() => handleReponer(prod.id)}
                        >
                          Confirmar
                        </button>
                        <button
                          className="btn btn-secondary btn-sm ms-2"
                          onClick={() => setReponerId(null)}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm ms-2"
                        onClick={() => setReponerId(prod.id)}
                      >
                        Reponer stock
                      </button>
                    )}
                  </td>
                  <td>
                    {editandoId === prod.id ? (
                      <>
                        {editData.imagen && (
                          <img src={editData.imagen} alt={editData.nombre} width="60" />
                        )}
                        <input
                          type="file"
                          className="form-control mt-2"
                          onChange={handleEditImage}
                          accept="image/*"
                        />
                      </>
                    ) : (
                      prod.imagen && <img src={prod.imagen} alt={prod.nombre} width="60" />
                    )}
                  </td>
                  <td>
                    {editandoId === prod.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleEditSave(prod.id)}
                        >
                          Guardar
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditandoId(null)}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => handleEditClick(prod)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarProducto(prod.id)}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
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
    </>
  );
};

export default Productos;
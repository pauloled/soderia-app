import React, { useEffect, useState } from 'react'
import { useAPI } from '../hooks/useAPI'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const { get } = useAPI()

  useEffect(() => {
    get('productos').then(res => setProductos(res.data))
  }, [get])

  return (
    <div className="container mt-5">
      <h2>Listado de Productos</h2>
      <ul className="list-group">
        {productos.map(p => (
          <li className="list-group-item d-flex justify-content-between" key={p.id}>
            {p.nombre} - ${p.precio} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Productos
import React from 'react'
import useStore from '../store/useStore'

const Home = () => {
  const { usuario, rol } = useStore()
  return (
    <div className="container mt-5">
      <h1>Bienvenidos a la Sodería</h1>
      {usuario ? <p>Sesión iniciada como <strong>{usuario}</strong> ({rol})</p> : <p>Por favor, inicie sesión</p>}
    </div>
  )
}

export default Home
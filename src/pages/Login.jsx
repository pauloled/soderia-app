import React, { useState } from 'react'
import { useAPI } from '../hooks/useAPI'
import useStore from '../store/useStore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const { get } = useAPI()
  const login = useStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await get(`usuarios?usuario=${usuario}&clave=${clave}`)
    if (res.data.length > 0) {
      login(usuario, res.data[0].rol)
      navigate('/')
    } else {
      alert('Credenciales inválidas')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Clave" onChange={(e) => setClave(e.target.value)} />
        <button className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
import React from 'react';
import '../styles/HeroSection.css';
import videoFondo from '../assets/agua.mp4'; // ✅ Importar video
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      
      <video className="video-bg" src={videoFondo} autoPlay muted loop playsInline />

      {/* Contenido encima del video */}
      <div className="container-fluid contenido-hero">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 text-white">¡Pureza bien protegida!</h1>
            <p className="mt-3 text-white">
              Envíos a todo el país! <br />
              Somos una empresa con ya 15 años de trayectoria,<br />
              siendo la mejor marca de nuestra categoría en la provincia.<br />
              Elaboramos nuestros productos bajo estrictos estándares de higiene y calidad.
            </p>
            <button className="btn btn-danger btn-lg mt-4" onClick={() => navigate('/login')}>
              ¡Hacé tu pedido!
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import bidon from '../assets/bidon.png'; // tu imagen de bidón
import '../styles/landing.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section d-flex align-items-center" id="nosotros">
      <div className="container text-white d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="text-content mb-4 mb-md-0">
          <h1 className="display-4 fw-bold">¡Pureza bien protegida!</h1>
          <p className="lead">
            Somos una marca nacional con presencia en el mercado desde hace 50 años con franquicias autorizadas a lo largo y ancho de nuestro país.<br />
            Elaboramos nuestros productos bajo estrictos estándares de higiene y calidad.
          </p>
          <button className="btn btn-danger btn-lg" onClick={() => navigate('/registro')}>
            ¡Hacé tu pedido!
          </button>
        </div>
        <img src={bidon} alt="Bidón de soda" className="img-fluid bidon-img" />
      </div>
    </section>
  );
};

export default HeroSection;
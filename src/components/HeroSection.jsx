import React from 'react';
import '../styles/HeroSection.css'; // o donde tengas tus estilos
import bidon from '../assets/bidon.jpg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4">¡Pureza bien protegida!</h1>
            <p className="mt-3">
              Envíos a todo el país! <br />
              Somos una empresa con ya 15 años de trayectoria,<br />
              siendo la mejor marca de nuestra categoría en la provincia.<br />
              Elaboramos nuestros productos bajo estrictos estándares de higiene y calidad.
            </p>
            <button className="btn btn-danger btn-lg mt-4" onClick={() => navigate('/registro')}>
              ¡Hacé tu pedido!
            </button>
          </div>
          <div className="col-md-6 text-center">
            <img src={bidon} alt="Bidón de soda" className="bidon-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

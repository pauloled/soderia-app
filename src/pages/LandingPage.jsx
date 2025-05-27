import React from 'react';
import NavbarLanding from '../components/NavbarLanding';
import HeroSection from '../components/HeroSection';
import CarouselProductos from '../components/CarouselProductos';

const LandingPage = () => {
  return (
    <>
      <NavbarLanding />
      <HeroSection />
      {/* Sección blanca genérica */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h3>Distribución nacional</h3>
          <p>Entregamos a todo el país con garantía de pureza y confianza.</p>
        </div>
      </section>
      <CarouselProductos />
    </>
  );
};

export default LandingPage;
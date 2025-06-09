import React from 'react';
import NavbarLanding from '../components/NavbarLanding';
import HeroSection from '../components/HeroSection';
import CarouselProductos from '../components/CarouselProductos';

const LandingPage = () => {
  return (
    <>
      <NavbarLanding />
      <HeroSection />


      {/* Sección donde se muestra el carrusel */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <CarouselProductos />
        </div>
      </section>
    </>
  );
};

export default LandingPage;

import React from 'react';
import producto1 from '../assets/prod1.png'; // productos fake
import producto2 from '../assets/prod2.png';

const CarouselProductos = () => (
  <section id="productos" className="bg-white py-5">
    <div className="container text-center">
      <h2 className="mb-4">Nuestros Productos</h2>
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={producto1} className="d-block w-100" alt="Producto 1" />
          </div>
          <div className="carousel-item">
            <img src={producto2} className="d-block w-100" alt="Producto 2" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>
      <p className="mt-3 text-muted small">Elaboración bajo estándares de calidad.</p>
    </div>
  </section>
);

export default CarouselProductos;
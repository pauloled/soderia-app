import React from 'react'; // productos fake
import producto1 from '../assets/aguasinfondo.png';
import producto2 from '../assets/bidoness.png';
import producto3 from '../assets/dispenser2.png';
import producto4 from '../assets/saborizadas.png';
import producto5 from '../assets/sifonsoda.png';

import '../styles/Carousel.css';


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
          <div className="carousel-item active">
            <img src={producto3} className="d-block w-100" alt="Producto 3" />
          </div>
          <div className="carousel-item active">
            <img src={producto4} className="d-block w-100" alt="Producto 4" />
          </div>
          <div className="carousel-item active">
            <img src={producto5} className="d-block w-100" alt="Producto 5" />
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
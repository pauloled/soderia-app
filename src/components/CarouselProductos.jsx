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
      <h2 className="mb-4 text-primary fw-bold">Nuestros Productos</h2>

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="producto-slide">
              <img src={producto1} className="d-block w-100" alt="Agua sin gas" />
              <h5 className="nombre-producto">Agua sin gas</h5>
            </div>
          </div>

          <div className="carousel-item">
            <div className="producto-slide">
              <img src={producto2} className="d-block w-100" alt="Bidones retornables" />
              <h5 className="nombre-producto">Bidones retornables</h5>
            </div>
          </div>

          <div className="carousel-item">
            <div className="producto-slide">
              <img src={producto3} className="d-block w-100" alt="Dispensers" />
              <h5 className="nombre-producto">Dispensers</h5>
            </div>
          </div>

          <div className="carousel-item">
            <div className="producto-slide">
              <img src={producto4} className="d-block w-100" alt="Aguas saborizadas" />
              <h5 className="nombre-producto">Aguas saborizadas</h5>
            </div>
          </div>

          <div className="carousel-item">
            <div className="producto-slide">
              <img src={producto5} className="d-block w-100" alt="Sifones de soda" />
              <h5 className="nombre-producto">Sifones de soda</h5>
            </div>
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
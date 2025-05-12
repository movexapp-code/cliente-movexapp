import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="presentation-container">
      <div className="presentation-content">
        {/* Bloque de Presentación */}
        <div className="hero-block">
          <h1 className="presentation-title">
            ¡Despierta tu potencial con Movex!
          </h1>
          <p className="presentation-subtitle">
            ¿Cansado de ver la vida pasar desde el sofá? ¿El malestar y las
            dolencias te están robando la energía? ¡Es hora de un cambio
            radical!
          </p>
          <p className="presentation-description">
            No te ofrecemos soluciones mágicas, sino un sistema probado para
            transformar tu cuerpo y tu mente. Nuestro equipo de expertos te
            guiará en cada paso, desde la creación de una rutina personalizada
            hasta el acceso a una comunidad que te apoya en tu camino.
          </p>
        </div>

        {/* Bloque de Características */}
        <div className="features-block">
          <h2 className="features-title">¿Listo para comenzar?</h2>
        </div>

        {/* Bloque de Llamada a la Acción */}
        <div className="call-to-action">
          <p className="final-message">
            Responde unas breves preguntas y descubre cómo Movex puede ayudarte
            a alcanzar tus metas.
          </p>
          <Link to="/formulario" className="presentation-button">
            ¡Únete hoy!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;

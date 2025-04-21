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
            En Movex, no te vendemos cuentos. Te ofrecemos las herramientas para
            transformar tu cuerpo, tu mente y tu vida, de la mano de nuestro
            equipo de expertos.
          </p>
        </div>

        {/* Bloque de Características */}
        <div className="features-block">
          <h2 className="features-title">¿Qué te espera en Movex?</h2>

          <div className="feature-category">
            <h3 className="feature-category-title">
              Retos que desafían tus límites
            </h3>
            <p className="feature-item">
              <strong>90 Días Quema Grasa:</strong> Despídete de lo que te sobra
              y da la bienvenida a tu mejor versión.
            </p>
            <p className="feature-item">
              <strong>Reconcilia tu Cuerpo en 90 Días:</strong> Fuerza,
              movilidad y control total, sin excusas ni materiales.
            </p>
          </div>

          <div className="feature-category">
            <h3 className="feature-category-title">
              Programas para todos los niveles
            </h3>
            <p className="feature-item">
              <strong>Membresía Movex:</strong> Acceso ilimitado a rutinas
              generales, videos técnicos y recursos para dominar la calistenia,
              el streetlifting y los pesos libres.
            </p>
          </div>

          <div className="feature-category">
            <h3 className="feature-category-title">
              Personalización que marca la diferencia
            </h3>
            <p className="feature-item">
              <strong>Rutinas Personalizadas:</strong> Diseñadas a tu medida con
              un exhaustivo cuestionario de 38 preguntas.
            </p>
            <p className="feature-item">
              <strong>Plan Premium:</strong> Combina nutrición con seguimiento
              profesional. ¡Resultados garantizados!
            </p>
            <p className="feature-item">
              <strong>Autocontrol de macros:</strong> Aprende a manejar tu
              alimentación.
            </p>
          </div>

          <div className="feature-category">
            <h3 className="feature-category-title">
              Potencia tu negocio online
            </h3>
            <p className="feature-item">Te ayudamos a crecer en 3 meses.</p>
          </div>

          <div className="feature-category">
            <h3 className="feature-category-title">
              Movex es tu trampolín al éxito
            </h3>
            <p className="feature-item">
              <strong>Resultados reales:</strong> No te conformes con menos.
            </p>
            <p className="feature-item">
              <strong>Compromiso total:</strong> Nuestro equipo te guía en cada
              paso del camino.
            </p>
            <p className="feature-item">
              <strong>Garantía de satisfacción:</strong> Si no ves resultados,
              te devolvemos tu dinero.
            </p>
          </div>
        </div>

        {/* Bloque de Llamada a la Acción */}
        <div className="call-to-action">
          <p className="final-message">
            No te quedes con lo que ya eres. Destapa tu potencial ilimitado.
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

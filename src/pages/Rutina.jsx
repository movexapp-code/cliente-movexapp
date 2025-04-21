import React from "react";
import { FaDumbbell, FaClock, FaLightbulb } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useRutinas } from "../hooks/UseRutina";
import Loader from "../components/Loader";
import "./css/Rutina.css";
import pesas from "../assets/pesas.png"; // Imagen de ejemplo para rutinas
import SinCompletarSeccion from "../components/SinCompletarSeccion.jsx";

export default function Rutina() {
  const { rutinas, loading } = useRutinas();
  console.log("perfil");

  if (loading) {
    return <Loader message="Cargando Rutinas..." />;
  }

  if (rutinas.length === 0) {
    return <SinCompletarSeccion img={pesas} />;
  }

  return (
    <div className="rutinas-container">
      <h1 className="rutinas-title">Rutinas, TOTAL: {rutinas.length}</h1>

      {rutinas.map(({ _id, nombre, descripcion, tips, ejercicios }) => (
        <div key={_id} className="rutina-card-alumno">
          <h2 className="rutina-title">{nombre}</h2>
          <p className="rutina-description">{descripcion}</p>

          {/* Tips */}
          {tips.length > 0 && (
            <div className="rutina-tips">
              {tips.map((tip, index) => (
                <div key={index} className="tip-item">
                  <FaLightbulb className="tip-icon" />
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ejercicios */}
          {ejercicios.length > 0 && (
            <div className="ejercicios-container">
              {ejercicios.map(
                ({
                  _id,
                  ejercicio,
                  series,
                  repeticiones,
                  descripcion,
                  descanso,
                  url,
                }) => (
                  <div key={_id} className="ejercicio-card">
                    <div>
                      <h3 className="ejercicio-title">
                        {" - "} {ejercicio} - <strong>{series} x {repeticiones}</strong>
                      </h3>

                      <p>{descripcion}</p>
                      <p className="ejercicio-descanso">
                        <FaClock className="icon-small" /> Descanso: {descanso}
                      </p>
                    </div>
                    {url && (
                      <div className="ejercicios-ver-video">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={url}
                          className="ejercicio-video-button"
                        >
                          <MdOutlineOndemandVideo className="ejercicio-icon-video" />
                        </a>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

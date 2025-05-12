import React from "react";
import { FaDumbbell, FaClock, FaLightbulb } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useRutinas } from "../hooks/UseRutina";
import Loader from "../components/Loader";
import "./css/Rutina.css";
import pesas from "../assets/pesas.png";
import SinCompletarSeccion from "../components/SinCompletarSeccion.jsx";

export default function Rutina() {
  const { rutinas, loading, convertToPDF, idAlumno } = useRutinas();

  if (loading) {
    return <Loader message="Cargando Rutinas..." />;
  }

  if (rutinas.length === 0) {
    return <SinCompletarSeccion img={pesas} />;
  }

  // Separar por tipo
  const rutinasGenerales = rutinas.filter((r) => r.tipo === "rutina_general");
  const rutinasTemporales = rutinas.filter((r) => r.tipo === "rutina_temporal");

  const renderRutinas = (lista, tipoTitulo, claseExtra) => (
    <div>
      <h2 className={`subtitulo-tipo ${claseExtra}`}>{tipoTitulo} - ({lista.length})</h2>
      {lista.map(({ nombre, descripcion, tips, ejercicios, id, tipo }, idx) => (
        <div key={nombre + idx} className={`rutina-card-alumno ${claseExtra}`}>
          <button onClick={() => convertToPDF(idAlumno, id, tipo)}>
            Convertir A PDF
          </button>
          <h3 className="rutina-title">{nombre}</h3>
          <p className="rutina-description">{descripcion}</p>

          {tips.length > 0 && (
            <div className="rutina-tips">
              {tips.map((tip, i) => (
                <div key={i} className="tip-item">
                  <FaLightbulb className="tip-icon" />
                  <p className="tip-text">{tip}</p>
                </div>
              ))}
            </div>
          )}

          {ejercicios.length > 0 && (
            <div className="ejercicios-container">
              {ejercicios.map(
                (
                  {
                    ejercicio,
                    series,
                    repeticiones,
                    descripcion,
                    descanso,
                    url,
                  },
                  i
                ) => (
                  <div key={i} className="ejercicio-card">
                    <div>
                      <h4 className="ejercicio-title">
                        {ejercicio} -{" "}
                        <strong>
                          {series} x {repeticiones}
                        </strong>
                      </h4>
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

  return (
    <div className="rutinas-container">
      <h1 className="rutinas-title">Rutinas del Alumno</h1>
      {renderRutinas(rutinasGenerales, "Rutinas Asignadas", "rutina-general")}
      {renderRutinas(
        rutinasTemporales,
        "Rutinas Temporales",
        "rutina-temporal"
      )}
    </div>
  );
}

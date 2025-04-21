import React, { useEffect } from "react";
import "./css/AgregarRutina.css";
import { useAgregarRutinaNueva } from "../../hooks/UseAgregarRutinaNueva";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

export default function AgregarRutinaNueva() {
  const { id } = useParams();
  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    ejercicios,
    videosDisponibles,
    agregarEjercicio,
    actualizarEjercicio,
    guardarRutina,
    cargarVideos,
    setTips,
    tips,
    loading,
  } = useAgregarRutinaNueva({ id });

  useEffect(() => {
    cargarVideos();
  }, [cargarVideos]);

  if (loading) {
    return <Loader message={"Guardando Rutina..."} />;
  }

  return (
    <div className="rutina-container">
      <h2>Crear Nueva Rutina</h2>

      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la rutina"
        className="input-grande"
      />

      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción general de la rutina"
        className="textarea-descripcion"
        rows={3}
      />

      {tips.map((tip, i) => (
        <div key={i} className="tip-container">
          <input
            type="text"
            value={tip}
            onChange={(e) => {
              const newTips = [...tips];
              newTips[i] = e.target.value;
              setTips(newTips);
            }}
            placeholder="Tip"
            className="input"
          />
        </div>
      ))}
      <button
        className="btn-agregar"
        onClick={() => setTips((prev) => [...prev, ""])}
      >
        + Agregar Tip
      </button>

      <h3>Ejercicios:</h3>
      {ejercicios.map((ej, i) => (
        <div key={i} className="ejercicio-card">
          <input
            type="text"
            value={ej.ejercicio}
            onChange={(e) =>
              actualizarEjercicio(i, "ejercicio", e.target.value)
            }
            placeholder="Nombre del ejercicio"
            className="input-grande"
          />

          <div className="inputs-row">
            <input
              type="text"
              value={ej.series}
              onChange={(e) => actualizarEjercicio(i, "series", e.target.value)}
              placeholder="Series"
              className="input"
            />
            <input
              type="text"
              value={ej.repeticiones}
              onChange={(e) =>
                actualizarEjercicio(i, "repeticiones", e.target.value)
              }
              placeholder="Repeticiones"
              className="input"
            />
            <input
              type="text"
              value={ej.descanso}
              onChange={(e) =>
                actualizarEjercicio(i, "descanso", e.target.value)
              }
              placeholder="Descanso"
              className="input"
            />
          </div>

          <label className="label">Video:</label>
          <select
            value={ej.url}
            onChange={(e) => actualizarEjercicio(i, "url", e.target.value)}
            className="input"
          >
            <option value="">Seleccionar video</option>
            {videosDisponibles.map((video, idx) => (
              <option key={idx} value={video.url}>
                {video.nombre}
              </option>
            ))}
          </select>

          {ej.url && (
            <video controls width="100%" className="video-preview">
              <source src={ej.url} type="video/mp4" />
              Tu navegador no soporta el video.
            </video>
          )}

          <textarea
            rows={2}
            value={ej.descripcion}
            onChange={(e) =>
              actualizarEjercicio(i, "descripcion", e.target.value)
            }
            placeholder="Descripción del ejercicio"
            className="textarea"
          />
        </div>
      ))}

      <button className="btn-agregar" onClick={agregarEjercicio}>
        + Agregar Ejercicio
      </button>

      <button className="btn-guardar" onClick={guardarRutina}>
        Guardar Rutina
      </button>
    </div>
  );
}

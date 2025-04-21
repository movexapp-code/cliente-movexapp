import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useAsignarVideos } from "../../hooks/UseAsignarVideos";
import "./css/asignarVideos.css";

const AsignarVideos = () => {
  const { showAlert } = useContext(AppContext);
  const { id } = useParams();
  const {
    archivosFiltrados,
    archivos,
    alumno,
    seleccionados,
    subiendo,
    loading,
    handleSeleccion,
    asignarArchivos,
    subirArchivo,
  } = useAsignarVideos(id, showAlert);

  if (loading) return <p className="cargando">Cargando...</p>;

  return (
    <div className="asignar-container">
      <h2>Asignar Videos a "{alumno?.nombre}"</h2>

      <div className="archivo-grid">
        {/* Archivos disponibles */}
        <div className="archivo-col">
          <h3>Archivos disponibles</h3>
          <div className="archivo-lista">
            {archivosFiltrados.map((archivo) => (
              <div
                key={archivo._id}
                className={`archivo-card ${
                  seleccionados.includes(archivo._id) ? "seleccionado" : ""
                }`}
                onClick={() => handleSeleccion(archivo._id)}
              >
                <img src={archivo.url} alt={archivo.nombre} />
                <span>{archivo.nombre}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Archivos asignados */}
        <div className="archivo-col">
          <h3>Archivos ya asignados</h3>
          <div className="archivo-lista">
            {archivos
              .filter((archivo) =>
                alumno.archivosAsignados?.includes(archivo._id)
              )
              .map((archivo) => (
                <div key={archivo._id} className="archivo-card asignado">
                  <img src={archivo.url} alt={archivo.nombre} />
                  <span>{archivo.nombre}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="botones">
        <button className="btn" onClick={asignarArchivos}>
          Asignar Videos
        </button>
        <label className="btn btn-subir">
          {subiendo ? "Subiendo..." : "Subir Nuevo Video"}
          <input type="file" hidden onChange={subirArchivo} />
        </label>
      </div>
    </div>
  );
};

export default AsignarVideos;

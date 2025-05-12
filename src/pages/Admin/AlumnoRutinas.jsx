import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./css/AlumnoRutina.css"; // Asegúrate de tener este archivo CSS
import { RutinaApi } from "../../api/Admin/Rutina";

const rutinaApi = new RutinaApi();

export default function AlumnoRutinas() {
  const location = useLocation();
  const alumno = location.state?.alumno;
  const navigate = useNavigate();

  const rutinas = alumno?.rutina || [];

  const handleEditar = (rutina) => {
    navigate("ver", {
      state: { rutina, alumnoId: alumno._id, modo: "editar", rutinas },
    });
  };

  const handleVer = (rutina) => {
    navigate("ver", { state: { rutina, rutinas } });
  };

  const handleAgregar = () => {
    navigate("agregar-rutina", { state: { alumnoId: alumno._id } });
  };

  const handleEliminar = async (rutina) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta rutina?")) {
      const res = await rutinaApi.eliminarRutina(alumno._id, rutina._id);
      if (res) {
        alert("Rutina eliminada con éxito");
        navigate(-1);
      } else {
        alert("Error al eliminar la rutina");
      }
    }
  };

  return (
    <div className="rutina-container">
      <h2>
        Rutinas de {alumno?.nombre} {alumno?.apellido}
      </h2>
      <button className="btn-agregar" onClick={handleAgregar}>
        + Agregar nueva rutina
      </button>
      <div className="rutina-lista">
        {rutinas.length > 0 ? (
          rutinas.map((rutina) => (
            <div className="rutina-card-rutina" key={rutina._id}>
              <div className="rutina-header">
                <h3 className="rutina-nombre-rutina">{rutina.nombre}</h3>
                <p className="rutina-nombre-p-rutina">{rutina.descripcion}</p>
                <p className="rutina-fecha">
                  Fecha: {new Date(rutina.fecha).toLocaleDateString()}
                </p>
              </div>

              <div className="ejercicios">
                {rutina.ejercicios.map((ej) => (
                  <div key={ej._id} className="ejercicio">
                    <strong>{ej.ejercicio}</strong>: {ej.series}x
                    {ej.repeticiones} ( Descanso: {ej.descanso})
                  </div>
                ))}
              </div>

              <div className="rutina-botones">
                <button onClick={() => handleVer(rutina)} className="btn-ver">
                  Ver completa
                </button>
                <button
                  onClick={() => handleEditar(rutina)}
                  className="btn-editar"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(rutina)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay rutinas cargadas.</p>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./RutinasModal.css"; // Estilos abajo
import { RutinaApi } from "../../api/Admin/Rutina";
//import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const rutinaApi = new RutinaApi();
const RutinasModal = ({ rutinaList, setOpenRutinasTemporales, alumno }) => {
  const [rutinasSeleccionadas, setRutinasSeleccionadas] = useState([]);
  const [load, setLoading] = useState(false); // Estado de carga

  useEffect(() => {
    if (alumno && alumno.rutinasTemporales) {
      // Nos aseguramos que sean strings para coincidir con los `value` de los checkboxes
      const rutinasIniciales = alumno.rutinasTemporales.map((id) =>
        id.toString()
      );
      setRutinasSeleccionadas(rutinasIniciales);
    }
  }, [alumno]);

  const handleSeleccion = (e) => {
    const idSeleccionado = e.target.value;

    setRutinasSeleccionadas(
      (prev) =>
        prev.includes(idSeleccionado)
          ? prev.filter((id) => id !== idSeleccionado) // deselecciona si ya estaba
          : [...prev, idSeleccionado] // agrega si no estaba
    );
  };
  console.log("Rutinas seleccionadas:", rutinasSeleccionadas);
  console.log("Rutinas temporales del alumno:", alumno.rutinasTemporales);
  console.log(rutinaList);
  const asignarRutinaTemporal = async () => {
    setLoading(true); // Inicia la carga
    try {
      await rutinaApi.asignarRutinaTemporal(
        {
          rutinasID: rutinasSeleccionadas,
        },
        alumno._id
      );
      alert("Rutinas asignadas correctamente.");
      setOpenRutinasTemporales(false);
      setRutinasSeleccionadas([]); // Reinicia la selección
      setLoading(false); // Finaliza la carga
    } catch (error) {
      console.error("Error al asignar rutinas:", error);
      alert("Error al asignar rutinas.");
    }
  };

  return (
    <div className="modal-rutina-temporal">
      <div className="modal-content-rutina-temporal">
        <h2>Asignar Rutinas</h2>
        <p>Seleccione una o más rutinas para asignar al alumno.</p>

        <div className="dropdown-container">
          {rutinaList.map((rutina) => (
            <label key={rutina.id} className="dropdown-option">
              <input
                className="dropdown-checkbox"
                type="checkbox"
                value={rutina.id}
                checked={rutinasSeleccionadas.includes(rutina.id)}
                onChange={handleSeleccion}
              />
              {rutina.nombre}
            </label>
          ))}
        </div>

        <button className="btn btn-primary" onClick={asignarRutinaTemporal}>
          {load ? "Cargando..." : "Asignar Rutinas"}
        </button>
        <button
          className="btn btn-close"
          onClick={() => setOpenRutinasTemporales(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default RutinasModal;

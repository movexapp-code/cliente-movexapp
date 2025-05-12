import React, { useState, useContext, useEffect } from "react";
import { AdminApi } from "../api/Admin/Admin";
import Loader from "../components/Loader";
import { AppContext } from "../context/AppContext";
import "./css/CrearRutinaModal.css";
import { RutinaApi } from "../api/Admin/Rutina";

const rutinaApi = new RutinaApi();

export default function EditarRutinaModal({
  isOpen,
  onClose,
  onSuccess,
  rutina,
}) {
  const { showAlert } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("Rutina a editar", rutina);

  useEffect(() => {
    if (isOpen && rutina) {
      setNombre(rutina.nombre || "");
      setDescripcion(rutina.descripcion || "");
      setEjercicios(
        rutina.ejercicios.length > 0
          ? rutina.ejercicios.map((ej) => ({
              ejercicio: ej.ejercicio || "",
              series: ej.series || "",
              repeticiones: ej.repeticiones || "",
              descanso: ej.descanso || "",
              descripcion: ej.descripcion || "",
            }))
          : [
              {
                ejercicio: "",
                series: "",
                repeticiones: "",
                descanso: "",
                descripcion: "",
              },
            ]
      );
    }
  }, [isOpen, rutina]);

  const handleEjercicioChange = (idx, field, value) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => (i === idx ? { ...ej, [field]: value } : ej))
    );
  };

  const addExercise = () => {
    setEjercicios((prev) => [
      ...prev,
      {
        ejercicio: "",
        series: "",
        repeticiones: "",
        descanso: "",
        descripcion: "",
      },
    ]);
  };

  const removeExercise = (idx) => {
    setEjercicios((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { nombre, descripcion, ejercicios };

    try {
      const resp = await rutinaApi.editarRutinaTemporal(rutina._id, payload);
      if (resp.ok) {
        showAlert("Rutina actualizada correctamente", 5000);
        onSuccess();
        onClose();
      } else {
        showAlert(resp.message || "Error al actualizar rutina", 5000);
      }
    } catch (err) {
      console.error(err);
      showAlert("Error de servidor", 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  if (loading) return <Loader message="Guardando cambios..." />;

  return (
    <div className="modal-rutina-backdrop">
      <div className="modal-rutina-content">
        <form onSubmit={handleSubmit} className="modal-rutina-form">
          <label className="modal-rutina-label">
            Nombre de Rutina
            <input
              className="modal-rutina-input"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>

          <label className="modal-rutina-label">
            Descripción
            <textarea
              className="modal-rutina-input"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </label>

          <div className="modal-rutina-ejercicios-list">
            {ejercicios.map((ej, idx) => (
              <div key={idx} className="modal-rutina-exercise-row">
                <input
                  className="modal-rutina-input"
                  type="text"
                  value={ej.ejercicio}
                  onChange={(e) =>
                    handleEjercicioChange(idx, "ejercicio", e.target.value)
                  }
                  placeholder="Ejercicio"
                  required
                />
                <input
                  className="modal-rutina-input"
                  type="text"
                  value={ej.series}
                  onChange={(e) =>
                    handleEjercicioChange(idx, "series", e.target.value)
                  }
                  placeholder="Series"
                  required
                />
                <input
                  className="modal-rutina-input"
                  type="text"
                  value={ej.repeticiones}
                  onChange={(e) =>
                    handleEjercicioChange(idx, "repeticiones", e.target.value)
                  }
                  placeholder="Repeticiones"
                  required
                />
                <input
                  className="modal-rutina-input"
                  type="text"
                  value={ej.descanso}
                  onChange={(e) =>
                    handleEjercicioChange(idx, "descanso", e.target.value)
                  }
                  placeholder="Descanso"
                  required
                />
                {ejercicios.length > 1 && (
                  <button
                    type="button"
                    className="modal-rutina-btn-remove-exercise"
                    onClick={() => removeExercise(idx)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="modal-rutina-btn-add-exercise"
            onClick={addExercise}
          >
            + Agregar Ejercicio
          </button>

          <div className="modal-rutina-actions">
            <button
              type="button"
              className="modal-rutina-btn-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-rutina-btn-submit">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

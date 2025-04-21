import React, { useState, useContext, useEffect } from "react";
import { AdminApi } from "../api/Admin/Admin";
import Loader from "../components/Loader";
import { AppContext } from "../context/AppContext";
import "./css/CrearRutinaModal.css";

const adminApi = new AdminApi();

export default function CrearRutinaModal({ isOpen, onClose, onSuccess, id }) {
  const { showAlert } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Inicializar un ejercicio vacío al abrir
  useEffect(() => {
    if (isOpen) {
      setNombre("");
      setEjercicios([
        { ejercicio: "", series: "", repeticiones: "", descanso: "" },
      ]);
    }
  }, [isOpen]);

  const handleEjercicioChange = (idx, field, value) => {
    setEjercicios((prev) =>
      prev.map((ej, i) => (i === idx ? { ...ej, [field]: value } : ej))
    );
  };

  const addExercise = () => {
    setEjercicios((prev) => [
      ...prev,
      { ejercicio: "", series: "", repeticiones: "", descanso: "" },
    ]);
  };

  const removeExercise = (idx) => {
    setEjercicios((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { nombre, rutina: ejercicios };
    try {
      const resp = await adminApi.crearRutinaGeneral(id, payload);
      if (resp.ok) {
        showAlert("Rutina creada correctamente", 5000);
        onSuccess();
        onClose();
      } else {
        showAlert(resp.message || "Error al crear rutina", 5000);
      }
    } catch (err) {
      console.error(err);
      showAlert("Error de servidor", 5000);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  if (loading) return <Loader message="Creando rutina..." />;

  return (
    <div className="modal-rutina-backdrop">
      <div className="modal-rutina-content">
        {!loading && (
          <form onSubmit={handleSubmit} className="modal-rutina-form">
            <h2>Nueva Rutina</h2>

            <label className="modal-rutina-label">
              Nombre de Rutina
              <input
                className="modal-rutina-input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Rutina Intermedios"
                required
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
                Guardar Rutina
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

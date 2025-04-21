import React, { useState, useEffect, useContext } from "react";
import { AdminApi } from "../../api/Admin/Admin"; // Ajusta según tu estructura
import Loader from "../../components/Loader";
import "./css/RutinasGenerales.css";
import { AppContext } from "../../context/AppContext";
import CrearRutinaModal from "../../components/CrearRutinaGeneralModal";

const adminApi = new AdminApi();

export default function RutinasGenerales() {
  const { user } = useContext(AppContext); // Asegúrate de que el ID del admin esté disponible en el contexto
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [onChange, setOnChange] = useState(false); // Estado para controlar el cambio

  const handleOnChange = () => {
    setOnChange((prev) => !prev); // Cambia el estado para forzar la recarga
  };

  const id = user._id; // Asegúrate de que el ID del admin esté disponible en el contexto

  useEffect(() => {
    async function fetchRutinas() {
      try {
        const resp = await adminApi.obtenerRutinasGenerales(id);
        if (resp.ok) {
          setRutinas(resp.rutinasGenerales);
        } else {
          setError(resp.message || "Error al cargar rutinas");
        }
      } catch (err) {
        console.error(err);
        setError("Error de servidor");
      } finally {
        setLoading(false);
      }
    }
    fetchRutinas();
  }, [id, onChange]);

  if (loading) return <Loader message="Cargando rutinas generales..." />;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="rutinas-container">
      <h2>Rutinas Generales</h2>
      <button onClick={() => setOpen(true)} className="btn-add-rutina">
        + Agregar Rutina
      </button>
      {rutinas.map(({ _id, nombre, rutina }, i) => (
        <section key={_id} className="rutina-card">
          <h3>
            {i + 1} - {nombre}{" "}
          </h3>
          <table className="ejercicios-table">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Series</th>
                <th>Repeticiones</th>
                <th>Descanso</th>
              </tr>
            </thead>
            <tbody>
              {rutina.map(
                ({ _id: idEj, ejercicio, series, repeticiones, descanso }) => (
                  <tr key={idEj}>
                    <td>{ejercicio}</td>
                    <td>{series}</td>
                    <td>{repeticiones}</td>
                    <td>{descanso}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </section>
      ))}
      <CrearRutinaModal
        isOpen={open}
        id={id}
        onClose={() => setOpen(false)}
        onSuccess={
          handleOnChange // Llama a la función para recargar la lista
        }
      />
    </div>
  );
}

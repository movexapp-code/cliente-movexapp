import React, { useState, useEffect, useContext } from "react";
import { AdminApi } from "../../api/Admin/Admin";
import Loader from "../../components/Loader";
import "./css/RutinasGenerales.css";
import { AppContext } from "../../context/AppContext";

import CrearRutinaModal from "../../components/CrearRutinaGeneralModal";
import EditarRutinaModal from "../../components/EditarRutinaModal";

const adminApi = new AdminApi();

export default function RutinasGenerales() {
  const { user } = useContext(AppContext);
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditar, setOpenEditar] = useState(false);
  const [open, setOpen] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [rutina, setRutina] = useState(null);

  const handleOnChange = () => {
    setOnChange((prev) => !prev);
  };

  useEffect(() => {
    async function fetchRutinas() {
      try {
        const resp = await adminApi.obtenerRutinasGeneralesCompletas();
        if (resp.ok) {
          setRutinas(resp.rutinas);
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
  }, [onChange]);

  if (loading) return <Loader message="Cargando rutinas generales..." />;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <div className="rutinas-container">
      <h2>Rutinas Generales</h2>
      <p>
        Aquí puedes ver las rutinas generales que se han creado para los
        alumnos. Todas las rutinas pueden ser utilizadas por los alumnos en el
        día a día del entrenamiento.
      </p>

      <button
        hidden={user.rol !== "administrador" && user.rol !== "subadministrador"}
        onClick={() => setOpen(true)}
        className="btn-add-rutina"
      >
        + Agregar Rutina
      </button>

      {rutinas.length === 0 ? (
        <p>No hay rutinas disponibles.</p>
      ) : (
        rutinas.map((rutina, i) => (
          <section key={rutina._id} className="rutina-card">
            <h3>
              {i + 1} - {rutina.nombre}{" "}
              <button
                className="btn-editar-rutina-temporal"
                onClick={() => {
                  setOpenEditar(true);
                  setRutina(rutina);
                }}
              >
                Editar
              </button>
            </h3>
            {rutina.descripcion && (
              <p className="descripcion-rutina">{rutina.descripcion}</p>
            )}

            {rutina.ejercicios.length > 0 ? (
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
                  {rutina.ejercicios.map(
                    ({
                      _id: idEj,
                      ejercicio,
                      series,
                      repeticiones,
                      descanso,
                    }) => (
                      <tr key={idEj || `${ejercicio}-${i}`}>
                        <td>{ejercicio}</td>
                        <td>{series}</td>
                        <td>{repeticiones}</td>
                        <td>{descanso}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p className="sin-ejercicios">
                Esta rutina aún no tiene ejercicios asignados.
              </p>
            )}
          </section>
        ))
      )}

      <CrearRutinaModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={handleOnChange}
      />

      <EditarRutinaModal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        onSuccess={handleOnChange}
        rutina={rutina}
      />
    </div>
  );
}

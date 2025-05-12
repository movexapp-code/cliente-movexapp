// src/pages/admin/AlumnoDetalle.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AlumnosAdminApi } from "../../api/Admin/Alumnos";
import "./css/AlumnoDetalle.css"; // Importa el archivo CSS
import MetricasAlumno from "../../components/MetricasAlumno";
import Loader from "../../components/Loader";
import { RutinaApi } from "../../api/Admin/Rutina";
import { AppContext } from "../../context/AppContext";
import RutinasModal from "./RutinaTemporalModal";

const rutinaApi = new RutinaApi();
const alumnosApi = new AlumnosAdminApi();

export default function AlumnoDetalle() {
  const { showAlert } = useContext(AppContext);
  const { id } = useParams();
  // const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);
  const [openRutinasTemporales, setOpenRutinasTemporales] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [rutinaList, setRutinaList] = useState([]);

  useEffect(() => {
    let isMounted = true; // para evitar actualizar el estado si el componente se desmonta

    const fetchData = async () => {
      setLoading(true); // Inicia la carga
      try {
        const [alumnoData, rutinasData] = await Promise.all([
          alumnosApi.getAlumno(id),
          rutinaApi.getListRutinasGenerales(),
        ]);
        console.log("Alumno data:", rutinasData);

        if (isMounted) {
          setAlumno(alumnoData);
          setRutinaList(rutinasData.rutinas);
          setLoading(false); // Finaliza la carga
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!alumno && loading) {
    return <Loader message={"Cargando alumno..."} />;
  }
  return (
    <div className="alumno-panel">
      <header className="alumno-panel__header">
        <h1 className="alumno-panel__title">
          {alumno?.nombre} {alumno?.apellido}
        </h1>
        <div className="alumno-panel__info">
          <p>
            <strong>Email:</strong> {alumno?.email}
          </p>
          <div className="alumno-panel__tags">
            <span className="tag">{alumno?.tipoAlumno}</span>
            <span className="tag">{alumno?.edad} años</span>
          </div>
        </div>
      </header>
      <div className="alumno-panel__actions">
        <button
          onClick={() => setOpenRutinasTemporales(true)}
          className="btn btn-orange"
        >
          Agregar Rutina Temporal
        </button>

        <Link
          to={`/admin/alumno/${id}/rutina`}
          state={{ alumno }}
          className="btn btn-orange"
        >
          Ver Rutinas
        </Link>
        <Link
          to={`/admin/alumno/${id}/modificar`}
          state={{ alumno }}
          className="btn btn-green"
        >
          Editar Datos
        </Link>
        <Link
          to={`/admin/alumno/${id}/respuestas`}
          state={{ alumno }}
          className="btn btn-blue"
        >
          Ver Respuestas
        </Link>
        <Link
          to={`/admin/alumno/${id}/videos-asignar`}
          state={{ alumno }}
          className="btn btn-purple"
        >
          Asignar Videos
        </Link>
        <Link state={{ alumno }} className="btn btn-red">
          Eliminar Alumno
        </Link>
      </div>
      {openRutinasTemporales && (
        <RutinasModal
          rutinaList={rutinaList}
          setOpenRutinasTemporales={setOpenRutinasTemporales}
          alumno={alumno}
          showAlert={showAlert}
        />
      )}

      <section className="alumno-panel__section">
        <h2 className="alumno-panel__subtitle">Archivos del Alumno</h2>
        {alumno?.archivos?.length > 0 ? (
          <div className="archivo-grid-detalle">
            {alumno.archivos.map((archivo) => (
              <div key={archivo._id} className="archivo-card-detalle">
                <span className="archivo-nombre">{archivo.nombre}</span>
                <div className="archivo-actions">
                  <a
                    href={archivo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-view"
                  >
                    Ver
                  </a>
                  <a href={archivo.url} download className="btn btn-download">
                    Descargar
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
            }}
          >
            No hay archivos subidos.
          </p>
        )}
      </section>

      <div className="alumno-panel__metrics">
        <MetricasAlumno colorTexto={"#ffffff"} metricas={alumno} />
      </div>

      <section className="alumno-panel__section">
        <h2 className="alumno-panel__subtitle">Rutina Principal Asignada</h2>
        {alumno?.rutina?.length > 0 ? (
          alumno.rutina.map((rutina) => (
            <div key={rutina._id} className="rutina-card">
              <h3 className="rutina-title">{rutina.nombre}</h3>
              <p className="rutina-desc">{rutina.descripcion}</p>
              <ul className="rutina-list">
                {rutina.ejercicios.map((ej) => (
                  <li className="alumno-detalle-li" key={ej._id}>
                    <strong>{ej.ejercicio}</strong> – {ej.series} x{" "}
                    {ej.repeticiones} (Descanso: {ej.descanso})
                  </li>
                ))}
              </ul>
              <Link
                to={`/admin/alumno/${id}/rutina/ver`}
                state={{ rutina }}
                className="btn btn-outline"
              >
                Ver Detalles
              </Link>
            </div>
          ))
        ) : (
          <p>No hay rutinas asignadas.</p>
        )}
      </section>

      <Link to="/admin/dashboard" className="btn btn-back">
        Volver al Panel
      </Link>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/AlumnoRutinaVer.css";
import { RutinaApi } from "../../api/Admin/Rutina";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import { archivosAdminApi } from "../../api/Admin/Archivos";

const rutinaApi = new RutinaApi();
const archivosApi = new archivosAdminApi();

export default function AlumnoRutinaVer() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext);
  const location = useLocation();
  const { rutina, modo, alumnoId } = location.state;
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(rutina.nombre);
  const [descripcion, setDescripcion] = useState(rutina.descripcion);
  const [fecha, setFecha] = useState(rutina.fecha.slice(0, 10));
  const [ejercicios, setEjercicios] = useState([...rutina.ejercicios]);
  const [tips, setTips] = useState([...rutina.tips]);
  const [nuevoTip, setNuevoTip] = useState("");
  const [nuevoEjercicio, setNuevoEjercicio] = useState({
    ejercicio: "",
    series: "",
    repeticiones: "",
    descanso: "",
    url: "",
  });

  const [videosDisponibles, setVideosDisponibles] = useState([]);

  console.log(rutina._id);

  useEffect(() => {
    const cargarVideos = async () => {
      try {
        const response = await archivosApi.getArchivos();
        setVideosDisponibles(response);
        console.log("Videos disponibles:", response);
      } catch (error) {
        console.error("Error al cargar videos:", error);
        showAlert("Error al cargar los videos", 5000);
      }
    };

    cargarVideos();
  }, [showAlert, modo]);

  const esEditable = modo === "editar";

  if (loading) {
    return <Loader message={"Agregando Ejercicio.."} />;
  }

  const agregarEjercicio = async () => {
    setLoading(true);
    const nuevo = { ...nuevoEjercicio, _id: Date.now().toString() };
    setEjercicios([...ejercicios, nuevo]);
    setNuevoEjercicio({
      ejercicio: "",
      series: "",
      repeticiones: "",
      descanso: "",
      url: "",
    });

    const response = await rutinaApi.agregarEjercicioRutina(
      alumnoId,
      rutina._id,
      nuevoEjercicio
    );

    if (response.ok) {
      showAlert("Ejercicio agregado correctamente", 5000);
    } else {
      showAlert("Error al agregar el ejercicio", 5000);
    }
    setLoading(false);
  };

  const guardarCambios = async () => {
    const rutinaEditada = {
      nombre,
      descripcion,
      tips,
      ejercicios,
    };

    const response = await rutinaApi.actualizarRutina(
      alumnoId,
      rutina._id,
      rutinaEditada
    );

    if (response.ok) {
      showAlert("Rutina actualizada con éxito", 4000);
      //await uploadUser();
      navigate("/admin/alumno/" + alumnoId);
      setLoading(false);
    } else {
      showAlert("Hubo un error al actualizar la rutina", 4000);
    }
  };

  const agregarTip = () => {
    if (nuevoTip.trim() !== "") {
      setTips([...tips, nuevoTip.trim()]);
      setNuevoTip("");
    }
  };

  return (
    <div className="rutina-container">
      <h2 className="rutina-titulo">
        {esEditable ? "Editar Rutina" : "Ver Rutina"}
      </h2>

      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        disabled={!esEditable}
        className="input"
      />

      <label>Descripción:</label>
      <textarea
        rows={3}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        disabled={!esEditable}
        className="textarea"
      />

      <label>Fecha:</label>
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        disabled={!esEditable}
        className="input"
      />

      <h3>Ejercicios:</h3>
      {ejercicios.map((ej, i) => (
        <div key={ej._id || i} className="ejercicio-card">
          <div className="ejercicio-header">
            <input
              type="text"
              value={ej.ejercicio}
              onChange={(e) => {
                const copia = [...ejercicios];
                copia[i].ejercicio = e.target.value;
                setEjercicios(copia);
              }}
              disabled={!esEditable}
              placeholder="Ejercicio"
              className="input"
            />

            <input
              type="text"
              value={ej.series}
              onChange={(e) => {
                const copia = [...ejercicios];
                copia[i].series = e.target.value;
                setEjercicios(copia);
              }}
              disabled={!esEditable}
              placeholder="Series"
              className="input"
            />

            <input
              type="text"
              value={ej.repeticiones}
              onChange={(e) => {
                const copia = [...ejercicios];
                copia[i].repeticiones = e.target.value;
                setEjercicios(copia);
              }}
              disabled={!esEditable}
              placeholder="Repeticiones"
              className="input"
            />

            <input
              type="text"
              value={ej.descanso}
              onChange={(e) => {
                const copia = [...ejercicios];
                copia[i].descanso = e.target.value;
                setEjercicios(copia);
              }}
              disabled={!esEditable}
              placeholder="Descanso"
              className="input"
            />

            <div className="video-section">
              <label>Video:</label>
              <select
                value={ej.url || ""}
                onChange={(e) => {
                  const copia = [...ejercicios];
                  copia[i].url = e.target.value;
                  setEjercicios(copia);
                }}
                disabled={!esEditable}
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
                <video controls width="100%" style={{ marginTop: "10px" }}>
                  <source src={ej.url} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
              )}
            </div>
          </div>

          <textarea
            rows={3}
            value={ej.descripcion || ""}
            onChange={(e) => {
              const copia = [...ejercicios];
              copia[i].descripcion = e.target.value;
              setEjercicios(copia);
            }}
            disabled={!esEditable}
            placeholder="Descripción del ejercicio"
            className="textarea"
          />
        </div>
      ))}

      {esEditable && (
        <div className="nuevo-ejercicio">
          <h4>Agregar ejercicio nuevo:</h4>
          <label>Ejercicio</label>
          <input
            type="text"
            placeholder="Ejercicio"
            value={nuevoEjercicio.ejercicio}
            onChange={(e) =>
              setNuevoEjercicio({
                ...nuevoEjercicio,
                ejercicio: e.target.value,
              })
            }
            className="input"
          />
          <label>Series</label>
          <input
            type="text"
            placeholder="Series"
            value={nuevoEjercicio.series}
            onChange={(e) =>
              setNuevoEjercicio({ ...nuevoEjercicio, series: e.target.value })
            }
            className="input"
          />
          <label>Repeticiones</label>
          <input
            type="text"
            placeholder="Repeticiones"
            value={nuevoEjercicio.repeticiones}
            onChange={(e) =>
              setNuevoEjercicio({
                ...nuevoEjercicio,
                repeticiones: e.target.value,
              })
            }
            className="input"
          />
          <label>Descanso</label>
          <input
            type="text"
            placeholder="Descanso"
            value={nuevoEjercicio.descanso}
            onChange={(e) =>
              setNuevoEjercicio({ ...nuevoEjercicio, descanso: e.target.value })
            }
            className="input"
          />
          <label>Video</label>
          <select
            value={nuevoEjercicio.url}
            onChange={(e) =>
              setNuevoEjercicio({ ...nuevoEjercicio, url: e.target.value })
            }
            className="input"
          >
            <option value="">Seleccionar video</option>
            {videosDisponibles.map((video, idx) => (
              <option key={idx} value={video.url}>
                {video.nombre}
              </option>
            ))}
          </select>
          <button onClick={agregarEjercicio} className="btn">
            Guardar Ejercicio
          </button>
        </div>
      )}

      <h3>Tips:</h3>
      <ul>
        {tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>

      {esEditable && (
        <div className="nuevo-tip">
          <input
            type="text"
            placeholder="Nuevo tip"
            value={nuevoTip}
            onChange={(e) => setNuevoTip(e.target.value)}
            className="input"
          />
          <button onClick={agregarTip} className="btn">
            Agregar tip
          </button>
        </div>
      )}

      {esEditable && (
        <div className="guardar-container">
          <button onClick={guardarCambios} className="btn btn-guardar">
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
}

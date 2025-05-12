import { useState, useCallback, useContext } from "react";
import { AlumnosAdminApi } from "../api/Admin/Alumnos";

import { AppContext } from "../context/AppContext";
import { archivosAdminApi } from "../api/Admin/Archivos";
import { useNavigate } from "react-router-dom";

const archivosApi = new archivosAdminApi();
const alumnoApi = new AlumnosAdminApi();
export const useAgregarRutinaNueva = ({ id }) => {
  const { showAlert } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const [descripcion, setDescripcion] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [videosDisponibles, setVideosDisponibles] = useState([]);
  const [tips, setTips] = useState([""]);
  const navigate = useNavigate();

  // Simular carga de videos
  const cargarVideos = useCallback(() => {
    archivosApi
      .getArchivos()
      .then((res) => {
        setVideosDisponibles(res);
      })
      .catch((error) => {
        console.error("Error al cargar videos:", error);
      });
  }, []);

  const agregarEjercicio = useCallback(() => {
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
  }, []);

  const actualizarEjercicio = useCallback((index, campo, valor) => {
    setEjercicios((prev) => {
      const copia = [...prev];
      copia[index][campo] = valor;
      return copia;
    });
  }, []);

  const guardarRutina = useCallback(async () => {
    setLoading(true);
    const rutina = {
      nombre,
      descripcion,
      tips,
      ejercicios,
      fecha: new Date().toISOString(),
    };

    // Simulación de envío a backend
    console.log("Enviando rutina:", rutina);
    // Aquí podés llamar a tu API, ej: alumnoApi.agregarRutina(rutina)
    const res = await alumnoApi.crearRutinaNueva(id, rutina);

    if (res.ok) {
      console.log("Rutina guardada con éxito");
      showAlert("Rutina guardada con éxito", 5000);
      setLoading(false);
      navigate(-2); // Volver a la página anterior
    } else {
      showAlert("Error al guardar la rutina", 5000);
      console.error("Error al guardar la rutina:", res.error);
      setLoading(false);
    }
  }, [nombre, descripcion, ejercicios, tips, id, showAlert, navigate]);

  return {
    nombre,
    setNombre,
    tips,
    setTips,
    descripcion,
    setDescripcion,
    ejercicios,
    videosDisponibles,
    agregarEjercicio,
    actualizarEjercicio,
    guardarRutina,
    cargarVideos,
    loading, // Estado de carga
  };
};

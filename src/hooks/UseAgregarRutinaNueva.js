import { useState, useCallback, useContext } from "react";
import { AlumnosAdminApi } from "../api/Admin/Alumnos";

import { AppContext } from "../context/AppContext";
const alumnoApi = new AlumnosAdminApi();
export const useAgregarRutinaNueva = ({ id }) => {
  const { showAlert } = useContext(AppContext);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carga
  const [descripcion, setDescripcion] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [videosDisponibles, setVideosDisponibles] = useState([]);
  const [tips, setTips] = useState([""]);

  // Simular carga de videos
  const cargarVideos = useCallback(() => {
    // Simulación, podrías usar un fetch real si tuvieras una API
    setVideosDisponibles([
      { nombre: "Flexiones Básicas", url: "https://video1.mp4" },
      { nombre: "Sentadillas Nivel 1", url: "https://video2.mp4" },
    ]);
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
    } else {
      showAlert("Error al guardar la rutina", 5000);
      console.error("Error al guardar la rutina:", res.error);
      setLoading(false);
    }
  }, [nombre, descripcion, ejercicios, tips, id, showAlert]);

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

/* src/hooks/useFormularioEvaluacion.js */
import { useState, useEffect, useCallback, useContext } from "react";
import { AlumnosAdminApi } from "../api/Admin/Alumnos";
import { AppContext } from "../context/AppContext";

const alumnosApi = new AlumnosAdminApi();

export function useFormularioEvaluacion() {
  const { showAlert } = useContext(AppContext);
  const [formulario, setFormulario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [secciones, setSecciones] = useState([]);
  const [nuevaPregunta, setNuevaPregunta] = useState({
    pregunta: "",
    tipoRespuesta: "",
    seccion: "",
    opciones: [],
  });
  const [optionInput, setOptionInput] = useState("");

  // Fetch form on mount
  useEffect(() => {
    async function fetchFormulario() {
      try {
        const resp = await alumnosApi.getFormularioPreguntas();
        setFormulario(resp);
        const unique = [...new Set(resp.preguntas.map((p) => p.seccion))];
        setSecciones(unique);
      } catch (e) {
        console.error("Error fetching formulario:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchFormulario();
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    setNuevaPregunta((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addOption = useCallback(() => {
    const opt = optionInput.trim();
    if (!opt) return;
    setNuevaPregunta((prev) => ({
      ...prev,
      opciones: [...prev.opciones, opt],
    }));
    setOptionInput("");
  }, [optionInput]);

  const removeOption = useCallback((idx) => {
    setNuevaPregunta((prev) => ({
      ...prev,
      opciones: prev.opciones.filter((_, i) => i !== idx),
    }));
  }, []);

  const submitPregunta = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const payload = {
          pregunta: nuevaPregunta.pregunta,
          tipoRespuesta: nuevaPregunta.tipoRespuesta,
          seccion: nuevaPregunta.seccion,
          ...(nuevaPregunta.tipoRespuesta === "opcion" && {
            opciones: nuevaPregunta.opciones,
          }),
        };
        const result = await alumnosApi.agregarPregunta(payload);
        if (result.ok) {
          setFormulario((prev) => ({
            ...prev,
            preguntas: [...prev.preguntas, payload],
          }));
          showAlert("Pregunta agregada correctamente", 5000);
          // reset form
          setNuevaPregunta({
            pregunta: "",
            tipoRespuesta: "",
            seccion: "",
            opciones: [],
          });
          setOptionInput("");
        }
      } catch (err) {
        console.error("Error submitting pregunta:", err);
      } finally {
        setLoading(false);
      }
    },
    [nuevaPregunta, showAlert]
  );

  return {
    formulario,
    loading,
    secciones,
    nuevaPregunta,
    optionInput,
    handleFieldChange,
    setOptionInput,
    addOption,
    removeOption,
    submitPregunta,
  };
}

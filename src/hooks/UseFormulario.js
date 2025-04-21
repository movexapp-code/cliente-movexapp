import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import AlumnoAPi from "../api/AlumnoApi";

const alumnoController = new AlumnoAPi();
const useFormulario = () => {
  const { showAlert, setPathActive } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("userMovex");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    setPathActive(window.location.pathname);
    const fetchData = async () => {
      setLoading(true);
      try {
        const [formResponse, userResponse] = await Promise.all([
          fetch("http://localhost:8082/formulario", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `ad42fgte32gedrg4tvdf3HK6dsfHAS4`,
            },
          }).then((res) => res.json()),

          fetch(
            `http://localhost:8082/usuario/${userId}/formulario/respuestas`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `ad42fgte32gedrg4tvdf3HK6dsfHAS4`,
              },
            }
          ).then((res) => res.json()),
        ]);

        setFormData(formResponse);
        setSections([...new Set(formResponse.preguntas.map((p) => p.seccion))]);
        setRespuestas(
          userResponse.map((r) => ({
            preguntaId: r._id,
            respuesta: r.respuesta || "",
          }))
        );
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, setPathActive]);

  useEffect(() => {
    localStorage.setItem("respuestas", JSON.stringify(respuestas));
  }, [respuestas]);

  const handleChange = (id, respuesta) => {
    setRespuestas((prev) =>
      prev.some((r) => r.preguntaId === id)
        ? prev.map((r) => (r.preguntaId === id ? { ...r, respuesta } : r))
        : [...prev, { preguntaId: id, respuesta }]
    );
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Respuestas enviadas:", respuestas);
    const storedUser = localStorage.getItem("userMovex");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user._id : null;
    if (!userId) {
      showAlert("No se encontró el usuario", 5000);
      return;
    }

    const respuestasValidas = respuestas.filter(
      (r) => r.respuesta !== "" && r.respuesta !== undefined
    );

    const res = await alumnoController.responderPreguntas(
      userId,
      respuestasValidas
    );

    console.log(res);

    if (res.ok) {
      showAlert("¡Respuestas Enviadas y Guardadas Correctamente!", 5000);
      setLoading(false);
    } else {
      showAlert("Error al enviar las respuestas", 5000);
      setLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1)
      setCurrentSection(currentSection + 1);
  };

  const prevSection = () => {
    if (currentSection > 0) setCurrentSection(currentSection - 1);
  };

  return {
    formData,
    respuestas,
    currentSection,
    sections,
    loading,
    handleChange,
    handleSubmit,
    nextSection,
    prevSection,
  };
};

export default useFormulario;

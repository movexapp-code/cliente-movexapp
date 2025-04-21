import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AlumnosAdminApi } from "../../api/Admin/Alumnos";
import "./css/RespuestasFormulario.css";

const alumnosApi = new AlumnosAdminApi();

export default function RespuestasFormulario() {
  const { id } = useParams();
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const data = await alumnosApi.verRespuestasFormulario(id);
        setRespuestas(data);
      } catch (error) {
        console.error("Error al obtener respuestas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRespuestas();
    }
  }, [id]);

  if (loading) return <p className="sin-respuestas">Cargando respuestas...</p>;

  if (!respuestas || respuestas.length === 0) {
    return <p className="sin-respuestas">No hay respuestas disponibles.</p>;
  }

  // Agrupar preguntas por sección
  const secciones = respuestas.reduce((acc, item) => {
    if (!acc[item.seccion]) acc[item.seccion] = [];
    acc[item.seccion].push(item);
    return acc;
  }, {});

  return (
    <div className="contenedor-respuestas">
      <h2 className="titulo-principal">Respuestas del Usuario</h2>

      {Object.entries(secciones).map(([seccion, preguntas]) => (
        <div key={seccion} className="seccion">
          <h3 className="titulo-seccion">
            {" "}
            {seccion} (
            {
              preguntas.filter(
                (p) => p.respuesta !== null && p.respuesta !== ""
              ).length
            }{" "}
            Respuestas de {preguntas.length})
          </h3>
          <div className="lista-preguntas">
            {preguntas.map((pregunta) => (
              <div key={pregunta._id} className="pregunta-card">
                <p className="pregunta-texto">{pregunta.pregunta}</p>
                <p className="respuesta-texto">
                  {pregunta.respuesta ?? (
                    <span className="respuesta-vacia">Sin respuesta</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* src/components/FormularioEvaluacion.jsx */
import React from "react";
import Loader from "../../components/Loader";
import { useFormularioEvaluacion } from "../../hooks/UseFormularioPreguntasAdmin";
import "./css/FormularioPreguntas.css";

export default function FormularioEvaluacion() {
  const {
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
  } = useFormularioEvaluacion();

  if (loading) return <Loader message="Cargando Formulario..." />;

  return (
    <div className="formulario-evaluacion">
      <h2>{formulario.titulo}</h2>

      {secciones.map((sec) => (
        <section key={sec} className="seccion">
          <h3>{sec}</h3>
          <ul>
            {formulario.preguntas
              .filter((p) => p.seccion === sec)
              .map(({ _id, pregunta, tipoRespuesta }) => (
                <li key={_id}>
                  {pregunta} <span className="tipo">({tipoRespuesta})</span>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <form onSubmit={submitPregunta} className="nueva-pregunta-form">
        <h3>Agregar Nueva Pregunta</h3>

        <label>
          Pregunta
          <input
            type="text"
            name="pregunta"
            value={nuevaPregunta.pregunta}
            onChange={(e) => handleFieldChange("pregunta", e.target.value)}
            required
          />
        </label>

        <label>
          Tipo de Respuesta
          <select
            name="tipoRespuesta"
            value={nuevaPregunta.tipoRespuesta}
            onChange={(e) => handleFieldChange("tipoRespuesta", e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            <option value="texto">Texto</option>
            <option value="numero">Número</option>
            <option value="opcion">Opción</option>
          </select>
        </label>

        {nuevaPregunta.tipoRespuesta === "opcion" && (
          <div className="opciones-container">
            <label>Opciones</label>
            <div className="opcion-input">
              <input
                type="text"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                placeholder="Nueva opción"
              />
              <button type="button" onClick={addOption}>
                Añadir
              </button>
            </div>
            <ul className="lista-opciones">
              {nuevaPregunta.opciones.map((opt, idx) => (
                <li key={idx}>
                  {opt}
                  <button type="button" onClick={() => removeOption(idx)}>
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <label>
          Sección
          <select
            name="seccion"
            value={nuevaPregunta.seccion}
            onChange={(e) => handleFieldChange("seccion", e.target.value)}
            required
          >
            <option value="">Selecciona...</option>
            {secciones.map((sec, i) => (
              <option key={i} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Agregar Pregunta</button>
      </form>
    </div>
  );
}

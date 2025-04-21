import React from "react";
import useFormulario from "../hooks/UseFormulario";
import "./css/Formulario.css";
import { RotatingSquare } from "react-loader-spinner";
import { AlertCircle } from "lucide-react";
import Loader from "../components/Loader";

const Formulario = () => {
  const {
    formData,
    respuestas,
    currentSection,
    sections,
    loading,
    handleChange,
    handleSubmit,
    nextSection,
    prevSection,
  } = useFormulario();

  if (loading) return <Loader message="Cargando Formulario" />;

  if (!formData) {
    return (
      <div className="loader-container">
        <h4>No tiene formularios para completar</h4>
        <p>
          Actualmente no tienes formularios para completar. Por favor, vuelve
          más tarde. Si tienes alguna pregunta, no dudes en contactarnos.
        </p>
        <p>
          Si quieres solicitar un formulario personalizado puedes hacerlo
          contactando a tu entrenador personal!
          <br />
          <strong>¡Estamos aquí para ayudarte a alcanzar tus objetivos!</strong>
        </p>
      </div>
    );
  }

  const currentQuestions = formData.preguntas.filter(
    (pregunta) => pregunta.seccion === sections[currentSection]
  );

  return (
    <div className="formulario-container">
      <div className="formulario-informacion">
        <h1 className="formulario-titulo">Información sobre el FORMULARIO</h1>
        <p>
          <AlertCircle size={54} />
          Este formulario es parte de un estudio de investigación sobre los
          hábitos de alimentación de la población. La información proporcionada
          será utilizada con fines académicos y no será compartida con terceros.
        </p>
        <p>
          <AlertCircle size={54} />
          La participación en este estudio es voluntaria y anónima. Si decides
          participar, por favor, responde con sinceridad y de la mejor manera
          posible.
        </p>
        <p>
          <AlertCircle size={54} />
          El formulario consta de varias secciones, en cada una de ellas
          encontrarás preguntas relacionadas con tus hábitos de alimentación.
          Por favor, responde con sinceridad y de la mejor manera posible.
        </p>
        <p>
          <AlertCircle size={54} />
          Al finalizar el formulario, haz clic en el botón "Enviar Formulario".
          Si tienes alguna duda, por favor, comunícate con el investigador
          responsable.
        </p>
      </div>
      <form className="formulario" onSubmit={handleSubmit}>
        <h1 className="formulario-titulo">{formData.titulo}</h1>
        <h3 className="formulario-seccion">
          {sections[currentSection]} {currentSection + 1} / {sections.length}
        </h3>
        <p>
          Completa el formulario con la información solicitada. Los campos con
          las opciones disponibles y en los campos de texto o número, escribe la
          información solicitada.
        </p>

        {currentQuestions.map((pregunta) => (
          <div key={pregunta._id} className="formulario-pregunta">
            <label className="formulario-etiqueta">{pregunta.pregunta}</label>
            {pregunta.tipoRespuesta === "texto" && (
              <input
                type="text"
                className={
                  respuestas.find((r) => r.preguntaId === pregunta._id)
                    .respuesta !== "" ?
                    "formulario-input formulario-input-completado"
                    : "formulario-input"
                }
                value={
                  respuestas.find((r) => r.preguntaId === pregunta._id)
                    ?.respuesta || ""
                }
                onChange={(e) => handleChange(pregunta._id, e.target.value)}
              />
            )}
            {pregunta.tipoRespuesta === "numero" && (
              <input
                type="number"
                className="formulario-input"
                value={
                  respuestas.find((r) => r.preguntaId === pregunta._id)
                    ?.respuesta || ""
                }
                onChange={(e) => handleChange(pregunta._id, e.target.value)}
              />
            )}
            {pregunta.tipoRespuesta === "opcion" && (
              <select
                className="formulario-select"
                value={
                  respuestas.find((r) => r.preguntaId === pregunta._id)
                    ?.respuesta || ""
                }
                onChange={(e) => handleChange(pregunta._id, e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {pregunta.opciones.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        <div className="formulario-navegacion">
          <button
            type="button"
            className="formulario-boton"
            onClick={prevSection}
            disabled={currentSection === 0}
          >
            Anterior
          </button>
          <button
            type="button"
            className="formulario-boton"
            onClick={nextSection}
            disabled={currentSection === sections.length - 1}
          >
            Siguiente
          </button>
        </div>

        {currentSection === sections.length - 1 && (
          <button type="submit" className="formulario-boton-enviar">
            Enviar Formulario
          </button>
        )}
      </form>
    </div>
  );
};

export default Formulario;

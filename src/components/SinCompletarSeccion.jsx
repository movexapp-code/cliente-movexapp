import React from 'react'
import "./css/SinCompletarSeccion.css";

export default function SinCompletarSeccion({img}) {
  return (
    <div className="rutinas-container-sin-completar">
        <h1 className="rutinas-title-sin-completar">No hay rutinas disponibles</h1>
        <img className="pesas-rutina" src={img} alt="" />
        <p className="rutinas-description">
          Actualmente no hay rutinas disponibles. Por favor, vuelve más tarde.
          Si tienes alguna pregunta, no dudes en contactarnos.
        </p>
        <p className="rutinas-description">
          Si queres solicitar una rutina personalizada puedes hacerlo
          contactando a tu entrenador personal!
          <br />
          <strong>¡Estamos aquí para ayudarte a alcanzar tus objetivos!</strong>
        </p>
        <button>Contactar Entrenador</button>
      </div>
  )
}

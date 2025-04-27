// src/components/VideosAsignados.jsx
import React from "react";
import { useVideosAsignados } from "../hooks/UseVideosAsignados";
import "../css/VideosAsignados.css";
import Loader from "../components/Loader";

export default function VideosAsignados() {
  const { videos, loading, formatearFecha } = useVideosAsignados();

  if (loading) {
    return <Loader message="Cargando Rutinas..." />;
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="videos-no">
        <h1 className="videos-no-title">No hay videos asignados</h1>
        <p className="videos-no-description">
          Actualmente no tienes videos asignados. Por favor, vuelve más tarde.
          Si tienes alguna pregunta, no dudes en contactarnos.
        </p>
        <p className="videos-no-description">
          Si quieres solicitar un video personalizado puedes hacerlo contactando
          a tu entrenador personal!
          <br />
          <strong>¡Estamos aquí para ayudarte a alcanzar tus objetivos!</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="videos-container-v">
      <h1 className="videos-title-v">Videos Asignados</h1>
      <p className="videos-subtitle-v">
        Aquí puedes ver los videos que te han sido asignados. Haz clic en el
        enlace para ver el video completo.
      </p>
      <div className="videos-list">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            <img
              src={video.url || "https://via.placeholder.com/300x170"}
              alt={video.titulo}
              className="video-thumbnail"
            />
            <div className="video-info">
              <h2 className="video-title">{video.nombre}</h2>
              <p>Creado: {formatearFecha(video.fechaCreacion)}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="video-link"
              >
                Ver video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

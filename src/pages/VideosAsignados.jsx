import React from "react";
import { useVideosAsignados } from "../hooks/UseVideosAsignados";
import "../css/VideosAsignados.css";
import Loader from "../components/Loader";
import movexApp from "../assets/logo.png";

export default function VideosAsignados() {
  const { videos, loading, formatearFecha } = useVideosAsignados();

  if (loading) {
    return <Loader message="Cargando Rutinas..." />;
  }
  console.log(videos);

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

  const renderPreview = (url, nombre) => {
    const extension = url.split(".").pop().toLowerCase();

    if (["mp4", "webm", "ogg"].includes(extension)) {
      return (
        <video className="video-thumbnail" controls>
          <source src={url} type={`video/${extension}`} />
          Tu navegador no soporta la etiqueta de video.
        </video>
      );
    }

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
      return <img src={url} alt={nombre} className="video-thumbnail" />;
    }

    if (extension === "pdf") {
      return (
        <embed
          src={url}
          type="application/pdf"
          width="100%"
          height="200px"
          className="video-thumbnail"
        />
      );
    }

    // Si no se reconoce el tipo, mostrar enlace genérico
    return (
      <div className="archivo-desconocido">
        <p>Archivo no previsualizable</p>
        <a href={url} target="_blank" rel="noreferrer" className="video-link">
          Ver archivo
        </a>
      </div>
    );
  };

  return (
    <div className="videos-container-v">
      <h1 className="videos-title-v">Videos Asignados</h1>
      <p className="videos-subtitle-v">
        Aquí puedes ver los archivos que te han sido asignados.
      </p>
      <div className="videos-list">
        {videos.map((video) => (
          <div key={video._id} className="video-card">
            {renderPreview(video.url || movexApp, video.nombre)}
            <div className="video-info">
              <h2 className="video-title">{video.nombre}</h2>
              <p>Creado: {formatearFecha(video.updatedAt)}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="video-link"
              >
                Ver archivo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

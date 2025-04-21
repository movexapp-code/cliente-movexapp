import React from "react";
import "./css/Videos.css";

export default class VideosYouTube extends React.Component {
  render() {
    const data = [
      {
        titulo: "Flexiones de Brazo",
        videoId: "raM88m58n0o",
      },
      {
        titulo: "Sentadillas",
        videoId: "m9pMtbfYFQU",
      },
      {
        titulo: "Abdominales",
        videoId: "2tXQbi16EdI",
      },
      {
        titulo: "Burpees",
        videoId: "JZQA08SlJnM",
      },
      {
        titulo: "Plancha",
        videoId: "pSHjTRCQxIw",
      },
      {
        titulo: "Zancadas",
        videoId: "Xcfs_3DMKlc",
      },
      {
        titulo: "Rutina Express",
        videoId: "RpFo8NSNqp4",
      },
      {
        titulo: "Rutina de 30 minutos",
        videoId: "BxIjGOtLyxg",
      },
      {
        titulo: "Rutina de 1 hora",
        videoId: "2nIQyfUOVPY",
      },
    ];

    return (
      <div className="videos-container">
        <h2>Videos de YouTube</h2>
        <div className="video-grid">
          {data.map((video) => (
            <div key={video.videoId} className="video-card">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt="Miniatura del video"
                  className="video-thumbnail"
                />
              </a>
              <p className="video-title">{video.titulo}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

import React, { useEffect, useState } from "react";
import { VideoApi } from "../api/Admin/Videos";
import "./css/Videos.css";

const apiVideos = new VideoApi();

export default function VideosYouTube() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ url: "", nombre: "", descripcion: "" });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await apiVideos.getVideos();
      setVideos(data);
    } catch (err) {
      console.error("Error al obtener videos:", err);
    }
  };

  const extractVideoId = (url) => {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
  };

  const openModal = (video = null) => {
    if (video) {
      setForm({
        url: video.url,
        nombre: video.nombre,
        descripcion: video.descripcion,
      });
      setEditId(video._id);
    } else {
      setForm({ url: "", nombre: "", descripcion: "" });
      setEditId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ url: "", nombre: "", descripcion: "" });
    setEditId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.url || !form.nombre) return;

    try {
      setLoading(true);
      if (editId) {
        await apiVideos.editarVideo(editId, form);
      } else {
        await apiVideos.crearVideo(form);
      }
      fetchVideos();
      closeModal();
    } catch (err) {
      console.error("Error al guardar video:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este video?")) {
      try {
        await apiVideos.eliminarVideo(id);
        fetchVideos();
      } catch (err) {
        console.error("Error al eliminar video:", err);
      }
    }
  };

  return (
    <div className="videos-container">
      <h2>Videos de YouTube</h2>
      <button className="btn-add" onClick={() => openModal()}>Agregar Video</button>

      <div className="video-grid">
        {videos.map((video) => {
          const videoId = extractVideoId(video.url);
          return (
            <div key={video._id} className="video-card">
              <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`Miniatura de ${video.nombre}`}
                className="video-thumbnail"
              />
              <div className="video-info">
                <h4>{video.nombre}</h4>
                <p>{video.descripcion}</p>
                <div className="video-actions">
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-ver">Ver</a>
                  <button onClick={() => openModal(video)} className="btn-editar">Editar</button>
                  <button onClick={() => handleDelete(video._id)} className="btn-eliminar">Eliminar</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editId ? "Editar Video" : "Agregar Video"}</h3>
            <form onSubmit={handleSubmit} className="video-form">
              <input
                type="text"
                name="url"
                placeholder="URL de YouTube"
                value={form.url}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del video"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : editId ? "Guardar Cambios" : "Agregar"}
                </button>
                <button type="button" onClick={closeModal} className="btn-cancelar">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

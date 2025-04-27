// src/components/ArchivosPanel.js
import React, { useState } from "react";
import useArchivos from "../../hooks/UseArchivosArdmin";
import { FiUploadCloud } from "react-icons/fi";
import { FaFilePdf, FaFileImage, FaFileAlt } from "react-icons/fa";
import "./css/ArchivosPanel.css";
import Loader from "../../components/Loader";

const getIcono = (url) => {
  if (!url) return <FaFileAlt />; // valor por defecto si no hay URL
  const ext = url.split(".").pop().toLowerCase();
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext))
    return <FaFileImage />;
  if (["pdf"].includes(ext)) return <FaFilePdf />;
  return <FaFileAlt />;
};

const ArchivosPanel = () => {
  const { archivos, loading, error, subirArchivo } = useArchivos();
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  const handleArchivoSeleccionado = (e) => {
    setArchivoSeleccionado(e.target.files[0]);
  };

  if (loading) {
    return <Loader message="Actualizando Videos..." />;
  }
  if (error) return <div>Error: {error}</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (archivoSeleccionado) {
      await subirArchivo(archivoSeleccionado, nombre, descripcion);
      setModalVisible(false);
      setNombre("");
      setDescripcion("");
      window.location.reload();

      setArchivoSeleccionado(null);
    }
  };

  return (
    <div className="container-videos-admin">
      <h1 className="titulo-panel">Archivos Subidos</h1>
      <button className="btn btn-crear" onClick={() => setModalVisible(true)}>
        <FiUploadCloud /> Subir nuevo archivo
      </button>

      <table className="tabla-archivos">
        <thead>
          <tr>
            <th>Archivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {archivos.map((archivo) => (
            <tr key={archivo._id}>
              <td>
                <span className="archivo-nombre">
                  {getIcono(archivo.url)} {archivo.nombre || "Sin nombre"}
                </span>
                <span className="archivo-nombre-descripcion">
                  {archivo.descripcion || "Sin descripción"}
                </span>
              </td>
              <td>
                <div className="archivo-actions">
                  <a
                    href={archivo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-view"
                  >
                    Ver
                  </a>
                  <a href={archivo.url} download className="btn btn-download">
                    Descargar
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Subir nuevo archivo</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre del archivo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type="file"
                onChange={handleArchivoSeleccionado}
                required
              />

              {archivoSeleccionado && (
                <div className="preview-container">
                  <p>Vista previa:</p>
                  {archivoSeleccionado.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(archivoSeleccionado)}
                      alt="preview"
                      className="archivo-preview"
                    />
                  ) : (
                    <div className="icono-preview">
                      {getIcono(archivoSeleccionado.name)}
                      <span>{archivoSeleccionado.name}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">
                  Subir
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => {
                    setModalVisible(false);
                    setArchivoSeleccionado(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivosPanel;

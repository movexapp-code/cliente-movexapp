import { useState } from "react";
import "../pages/css/archivosSubidosAlumno.css";

export default function NewFileModal({ onClose, onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setError("Por favor, selecciona un archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("archivo", archivo);

    const exito = await onSubmit(formData);
    if (exito) onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-header">Subir Nuevo Archivo</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-field">
              <label>Nombre del Archivo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="modal-field">
              <label>Seleccionar Archivo</label>
              <input
                type="file"
                onChange={(e) => setArchivo(e.target.files[0])}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-button-cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-button-submit">
              Subir Archivo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

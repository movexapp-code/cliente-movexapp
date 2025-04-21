import React, { useState } from "react";
import "./css/ProfileModal.css";

const ProfileModal = ({ userData, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: userData.nombre,
    apellido: userData.apellido,
    email: userData.email,
    edad: userData.edad,
    peso: userData.peso,
    altura: userData.altura,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos actualizados:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Editar Datos Personales</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </div>
          <div className="modal-row">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </div>
          <div className="modal-row">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="modal-row">
            <label>Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              placeholder="Edad"
            />
          </div>
          <div className="modal-row">
            <label>Peso (kg)</label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              placeholder="Peso (kg)"
            />
          </div>
          <div className="modal-row">
            <label>Altura (cm)</label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              placeholder="Altura (cm)"
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button">
              Guardar
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;

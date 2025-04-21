// src/components/Perfil.jsx
import React from "react";
import useProfile from "../hooks/UsePerfil";
import "./css/Perfil.css";
import avatar from "../assets/avatar.png"; // Imagen de ejemplo para el avatar
import banner from "../assets/banner.jpg"; // Imagen de ejemplo para el banner
import BarChart from "../components/BarChart";
import MetricasAlumno from "../components/MetricasAlumno";
import { Link } from "react-router-dom";

const Perfil = () => {
  const { formValues } = useProfile();
  console.log("perfil");


  return (
    <div className="perfil-container">
      <div className="perfil-banner">
        <img src={banner} alt="Banner" className="banner-img" />
      </div>
      <div className="perfil-content">
        <img src={avatar} alt="Avatar" className="perfil-avatar" />
        <h2 className="perfil-nombre">
          {formValues.nombre} {formValues.apellido}
        </h2>
        <p className="perfil-email">{formValues.email}</p>
        <p className="perfil-rol">Rol: {formValues.rol}</p>

        <div className="perfil-estadisticas">
          <div className="stat-box">
            <h3>{formValues.peso} kg</h3>
            <p>Peso</p>
          </div>
          <div className="stat-box">
            <h3>{formValues.altura} cm</h3>
            <p>Altura</p>
          </div>
          <div className="stat-box">
            <h3>{formValues.edad} años</h3>
            <p>Edad</p>
          </div>
          <div className="stat-box">
            <h3>{formValues.imc}</h3>
            <p>IMC</p>
          </div>
        </div>

        {/* Sección de métricas con gráficos */}
        <MetricasAlumno metricas={formValues} />
        <div className="metabolism-charts">
          {/* Gráficos de barras para metabolismo */}
          <BarChart
            value={formValues.metabolismoBasal}
            label="Metabolismo basal"
            color="#e5f233"
          />
          <BarChart
            value={formValues.metabolismoActivo}
            label="Metabolismo activo"
            color="#28a745"
          />
          <BarChart
            value={formValues.metabolismoTotal}
            label="Metabolismo total"
            color="#6f42c1"
          />
        </div>

        <div className="perfil-botones">
          <Link to="/archivos" className="btn">
            Ver Historial Archivos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

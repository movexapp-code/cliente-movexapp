import React from "react";
import CircularChart from "./CircularChart";
import "./css/MetricasAlumno.css";

export default function MetricasAlumno({ metricas, colorTexto }) {
  const metricasConfig = [
    { key: "porcentajeGrasa", label: "Grasa", color: "#ff6600" },
    { key: "porcentajeMusculo", label: "Músculo", color: "#17a2b8" },
    { key: "flexibiliadad", label: "Flexibilidad", color: "#28a745" },
    { key: "fuerza", label: "Fuerza", color: "#dc3545" },
    { key: "resistencia", label: "Resistencia", color: "#6f42c1" },
    { key: "movilidad", label: "Movilidad", color: "#20c997" },
    { key: "porcentajeGlobal", label: "Global", color: "#8fb8ff" },
  ];

  return (
    <div className="perfil-metricas">
      <h3 className="titulo-metricas-alumno">Métricas</h3>
      <div className="metric-charts">
        {metricasConfig.map(({ key, label, color }) => (
          <CircularChart
            key={key}
            percentage={metricas[key]}
            label={label}
            color={color}
            colorTexto={colorTexto}
          />
        ))}
      </div>
    </div>
  );
}

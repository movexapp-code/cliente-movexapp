import React from "react";
import "./css/CircularChart.css";

const CircularChart = ({ percentage, label, color, colorTexto }) => {
  // Definimos el radio y grosor del círculo.
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Calculamos el offset de trazo según el porcentaje.
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-chart-container">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          className="circular-bg"
          stroke="#e6e6e6"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="circular-progress"
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
        />
      </svg>
      <div className="circular-chart-text">
        <span
          style={{
            color: colorTexto || "#000",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {percentage}%
        </span>
        <span
          style={{
            color: colorTexto || "#000",
            fontSize: "16px",
            fontWeight: "normal",
          }}
          className="chart-label"
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default CircularChart;

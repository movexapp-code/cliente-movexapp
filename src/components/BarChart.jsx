import React from "react";
import "./css/BarChart.css";

const BarChart = ({ value, label, max = 3000, color }) => {
  // max es un valor máximo asumido para escalar la barra (ajústalo según tu caso)
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-label">
        {label}: {value} kcal
      </div>
      <div className="bar-chart-bar">
        <div
          className="bar-chart-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default BarChart;

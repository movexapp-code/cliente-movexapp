import React, { useEffect, useState } from "react";
import "./css/Alert.css";
import { FiAlertCircle, FiX } from "react-icons/fi"; // Importamos iconos

const Alert = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Muestra la alerta con animación
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`alert ${visible ? "show" : "hide"}`}>
      <FiAlertCircle className="alert-icon" color="orange" />
      <span className="alert-message">{message}</span>
    </div>
  );
};

export default Alert;

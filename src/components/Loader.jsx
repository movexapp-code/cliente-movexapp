import React from "react";
import logo from "../assets/logo.png";
import "./css/Loader.css"; // Importa el archivo CSS

export default function Loader({ message }) {
  return (
    <div className="loader-container">
      <img className="loader-img" src={logo} alt="" />
      <p>{message}</p>
    </div>
  );
}

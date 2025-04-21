import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./css/Menu.css";

const MenuAdmin = () => {
  //const menuPath = window.location.pathname;
  //console.log("Ruta actual:", menuPath);
  // Función para manejar el estado activo del menú
  //const menuActive = () => {};

  return (
    <nav className="menu-container">
      <div className="menu-section menu-left">
        <Link className="menu-item" to="/">
          Portada
        </Link>
        <Link className="menu-item" to="/admin/dashboard">
          Alumnos
        </Link>
        <Link className="menu-item" to="/admin/preguntas-formulario">
          Preguntas Formulario
        </Link>
      </div>

      {/* Logo centrado */}
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="menu-logo-img" />
      </div>

      <div className="menu-section menu-right">
        <Link className="menu-item" to="/admin/archivos">
          Videos Generales
        </Link>
        <Link className="menu-item" to="/admin/rutinas-generales">
          Rutinas Generales
        </Link>
        <Link className="menu-item" to="/admin/crear-alumno">
          Crear Alumno
        </Link>
      </div>
    </nav>
  );
};

export default MenuAdmin;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./css/Menu.css";
import Breadcrumbs from "./Breadcrumbs";

const MenuAlumno = () => {
  return (
    <nav className="menu-container">
      <Breadcrumbs />
      <div className="menu-section menu-left">
        <Link className="menu-item" to="/">
          Inicio
        </Link>
        <Link className="menu-item" to="/formulario">
          Formulario
        </Link>
        <Link className="menu-item" to="/archivos">
          Tus Archivos
        </Link>
      </div>

      {/* Logo centrado */}
      <div className="menu-logo">
        <img src={logo} alt="Logo" className="menu-logo-img" />
      </div>

      <div className="menu-section menu-right">
        <Link className="menu-item" to="/videos-asignados">
          Videos Asinados
        </Link>
        <Link className="menu-item" to="/videos">
          Videos Generales
        </Link>
        <Link className="menu-item" to="/rutinas">
          Rutinas
        </Link>
        <Link className="menu-item" to="/perfil">
          Perfil
        </Link>
      </div>
    </nav>
  );
};

export default MenuAlumno;

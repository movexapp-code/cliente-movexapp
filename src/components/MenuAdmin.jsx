import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./css/Menu.css";

const MenuAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`menu-container ${menuOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Logo solo visible si no está abierto el menú en mobile */}

      <div className="menu-logo">
        <img src={logo} alt="Logo" className="menu-logo-img" />
      </div>

      <div className={`menu-section menu-left ${menuOpen ? "active" : ""}`}>
        <Link onClick={() => setMenuOpen(false)} className="menu-item" to="/">
          Portada
        </Link>
        <Link
          className="menu-item"
          onClick={() => setMenuOpen(false)}
          to="/admin/dashboard"
        >
          Alumnos
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          className="menu-item"
          to="/admin/preguntas-formulario"
        >
          Preguntas Formulario
        </Link>
      </div>

      <div className={`menu-section menu-right ${menuOpen ? "active" : ""}`}>
        <Link
          onClick={() => setMenuOpen(false)}
          className="menu-item"
          to="/admin/videos-generales"
        >
          Videos Youtube
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          className="menu-item"
          to="/admin/archivos"
        >
          Archivos
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          className="menu-item"
          to="/admin/rutinas-generales"
        >
          Rutinas Generales
        </Link>
        <Link
          onClick={() => setMenuOpen(false)}
          className="menu-item"
          to="/admin/crear-alumno"
        >
          Crear Alumno
        </Link>
      </div>
    </nav>
  );
};

export default MenuAdmin;

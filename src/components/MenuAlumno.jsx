import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./css/Menu.css";
import Breadcrumbs from "./Breadcrumbs";

const MenuAlumno = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="menu-container">
      <Breadcrumbs />

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`menu-section menu-left ${menuOpen ? "active" : ""}`}>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/">Inicio</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/formulario">Formulario</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/archivos">Tus Archivos</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/rutinas">Rutinas</Link>
      </div>

      <div className="menu-logo">
        <img src={logo} alt="Logo" className="menu-logo-img" />
      </div>

      <div className={`menu-section menu-right ${menuOpen ? "active" : ""}`}>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/videos-asignados">Videos Asinados</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/videos">Videos Generales</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/perfil">Perfil</Link>
      </div>
    </nav>
  );
};

export default MenuAlumno;

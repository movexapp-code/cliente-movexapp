import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./css/Menu.css";

const MenuSubAdmin = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="menu-container">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`menu-section menu-left ${menuOpen ? "active" : ""}`}>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/">Portada</Link>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/admin/dashboard">Alumnos</Link>
      </div>

      <div className="menu-logo">
        <img src={logo} alt="Logo" className="menu-logo-img" />
      </div>

      <div className={`menu-section menu-right ${menuOpen ? "active" : ""}`}>
        <Link className="menu-item" onClick={() => setMenuOpen(false)} to="/admin/rutinas-generales">Rutinas Generales</Link>
        {/* <Link className="menu-item" to="/admin/crear-alumno">Crear Alumno</Link> */}
      </div>
    </nav>
  );
};

export default MenuSubAdmin;
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Breadcrumbs.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { FiRefreshCw } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Breadcrumbs = () => {
  const navigate = useNavigate();
  const { uploadUser } = useContext(AppContext); // Extrae el estado de usuario del contexto

  const handleBack = () => {
    navigate(-1); // Navega a la ruta anterior
  };
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) {
    return null; // No hay rutas para mostrar
  }

  const refreshUser = async () => {
    await uploadUser();
  };

  if (location.pathname === "/alumnos") {
    return null; // No mostrar breadcrumbs en la ruta "/alumnos"
  }

  return (
    <nav className="breadcrumbs-with-back">
      <button className="back-button" onClick={handleBack}>
        <IoMdArrowBack className="back-icon" />
      </button>
      <button className="refresh-button" onClick={refreshUser}>
        <FiRefreshCw className="back-icon" />
      </button>
    </nav>
  );
};

export default Breadcrumbs;

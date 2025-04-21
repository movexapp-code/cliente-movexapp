// src/components/Layout.jsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Alert from "./Alert";
import { AppContext } from "../context/AppContext";
import Login from "./Login";
import "./css/Layout.css"; // Importa el archivo CSS
import { CiLogout } from "react-icons/ci";
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => {
  const { alert, user } = useContext(AppContext); // Extrae el estado de alerta y usuario del contexto

  if (!user) {
    return (
      <div>
        <Login />{" "}
        {/* Renderiza solo el componente Login si el usuario no está logueado */}
      </div>
    );
  }

  return (
    <div className="layout-container">
      <Menu />
      <Breadcrumbs />
      <div style={{ flex: 1 }}>
        {alert.message && (
          <Alert message={alert.message} duration={alert.duration} />
        )}
        <Outlet />{" "}
        {/* Este es el lugar donde se renderizarán las rutas hijas */}
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("userMovex");
          window.location.reload();
        }}
        className="btn-logout"
      >
        <CiLogout className="logout-icon" />
      </button>
    </div>
  );
};

export default Layout;

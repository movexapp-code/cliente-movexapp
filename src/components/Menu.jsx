import React from "react";

import "./css/Menu.css";
import MenuAdmin from "./MenuAdmin";
//import MenuPremium from "./MenuPremium";
import MenuAlumno from "./MenuAlumno";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuSubAdmin from "./MenuSubAdmin";

const Menu = () => {
  const { user, path } = useContext(AppContext);

  if (user.rol === "administrador") return <MenuAdmin path={path} />;
  if (user.rol === "subadministrador") return <MenuSubAdmin path={path} />;
  //if (user.rol === "PREMIUM") return <MenuPremium />;
  return <MenuAlumno path={path} />; // ALUMNO por defecto
};

export default Menu;

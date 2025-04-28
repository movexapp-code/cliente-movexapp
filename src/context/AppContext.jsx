// src/context/AppContext.jsx
import React, { createContext, useState } from "react";
import AlumnoApi from "../api/AlumnoApi.js";
import { AdminApi } from "../api/Admin/Admin.js";

const alumnoController = new AlumnoApi();
const adminController = new AdminApi();

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", duration: 0 });
  const [path, setPath] = useState("/");
  const [loading, setLoading] = useState(false); // Estado de carga

  const setearUsuario = async (userLogueado) => {
    const { usuario } = userLogueado;
    //console.log(usuario);
    localStorage.setItem("userMovex", JSON.stringify(usuario));
  };

  const login = async (data) => {
    setLoading(true); // Inicia la carga
    const userLogueado = await alumnoController.loginAlumno(
      data.email,
      data.password
    );
    console.log(userLogueado);
    if (userLogueado.ok === true) {
      //console.log(userLogueado);
      await setearUsuario(userLogueado);
      showAlert("¡Bienvenido a MOVEX APP!", 5000);
    } else {
      showAlert("¡Usuario o contraseña incorrectos!", 5000);
    }
    setLoading(false); // Finaliza la carga
  };

  const logout = () => {
    localStorage.removeItem("userMovex");
    showAlert("¡Has cerrado sesión!", 5000); // Muestra un mensaje de alerta al cerrar sesión
  };

  const showAlert = (message, duration) => {
    setAlert({ message, duration });
    setTimeout(() => setAlert({ message: "", duration: 0 }), duration);
  };

  const setPathActive = (path) => {
    setPath(path);
    //console.log("path", path);
  };

  const user = JSON.parse(localStorage.getItem("userMovex")) || null;

  const uploadUser = async () => {
    setLoading(true); // Inicia la carga
    const storedUser = localStorage.getItem("userMovex");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user._id : null;
    if (!userId) {
      showAlert("No se encontró el usuario", 5000);
      return;
    }
    let res;

    if (user.rol === "alumno") {
      res = await alumnoController.getAlumno(userId);
    } else {
      res = await adminController.getAdmin(userId);
    }

    if (res) {
      localStorage.setItem("userMovex", JSON.stringify(res));
      showAlert("¡Usuario actualizado correctamente!", 5000);
    } else {
      showAlert("Error al actualizar el usuario", 5000);
    }
    setLoading(false); // Finaliza la carga
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        alert,
        showAlert,
        setPathActive,
        path,
        uploadUser,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

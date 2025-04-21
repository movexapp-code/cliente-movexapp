// src/hooks/useProfile.js
import { useState, useMemo, useCallback, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import AlumnoApi from "../api/AlumnoApi"; // Se importa la API de Alumno.

const alumnoController = new AlumnoApi(); // Se crea una instancia de la API de Alumno.

const usePerfil = () => {
  const { setPathActive } = useContext(AppContext); // Se obtiene el contexto del usuario.
  // Cambia el path activo al de perfil.
  setPathActive(window.location.pathname);
  // Se obtiene y parsea la información del usuario desde el localStorage.
  const userData = useMemo(() => {
    const storedUser = localStorage.getItem("userMovex");
    return storedUser ? JSON.parse(storedUser) : {};
  }, []);

  // Se obtiene el ID del usuario.
  useEffect(() => {
    //vamos a llamar al alumno de la api
    const userId = userData ? userData._id : null;
    if (!userId) {
      console.error("No se encontró el ID del usuario");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await alumnoController.getAlumno(userId);
        localStorage.setItem("userMovex", JSON.stringify(response)); // Se guarda la información del usuario en el localStorage.
        // Aquí puedes hacer algo con los datos del usuario, como guardarlos en el estado.
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userData]); // Se asegura de que el efecto se ejecute cuando userData cambie.

  console.log(userData); // Para verificar que se obtiene correctamente la información del usuario.

  // Se definen los valores iniciales, usando propiedades del usuario y valores por defecto.
  const initialFormValues = useMemo(
    () => ({
      nombre: userData.nombre || "",
      apellido: userData.apellido || "",
      email: userData.email || "",
      rol: userData.rol || "",
      tipoAlumno: userData.tipoAlumno || "",
      peso: userData.peso || 0,
      altura: userData.altura || 0,
      edad: userData.edad || 0,
      imc: userData.imc || 0,
      porcentajeGrasa: userData.porcentajeGrasa || 0,
      porcentajeMusculo: userData.porcentajeMusculo || 0,
      metabolismoBasal: userData.metabolismoBasal || 0,
      metabolismoActivo: userData.metabolismoActivo || 0,
      metabolismoTotal: userData.metabolismoTotal || 0,
      flexibiliadad: userData.flexibiliadad || 0,
      fuerza: userData.fuerza || 0,
      resistencia: userData.resistencia || 0,
      movilidad: userData.movilidad || 0,
      porcentajeGlobal: userData.porcentajeGlobal || 0,
    }),
    [userData]
  );

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = useCallback((e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const resetFormValues = useCallback(() => {
    setFormValues(initialFormValues);
  }, [initialFormValues]);

  return {
    userData,
    formValues,
    handleChange,
    resetFormValues,
  };
};

export default usePerfil;

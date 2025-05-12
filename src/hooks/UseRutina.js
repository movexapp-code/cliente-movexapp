import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AlumnosAdminApi } from "../api/Admin/Alumnos";

const alumnoAdminApi = new AlumnosAdminApi();
export const useRutinas = () => {
  const [rutinas, setRutinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setPathActive } = useContext(AppContext);

  // Obtenemos el usuario del localStorage y parseamos la información.
  const storedUser = localStorage.getItem("userMovex");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user._id : null;

  //console.log(userId); // Para verificar que se obtiene correctamente el ID del usuario.

  useEffect(() => {
    // Cambiamos el path activo al de rutinas
    setPathActive(window.location.pathname);
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true); // Inicia el loading
        const data = await alumnoAdminApi.getRutinasAlumnosMixto(userId);
        console.log(data);

        setRutinas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Termina el loading, ya sea por éxito o error
      }
    };

    fetchData();
  }, [userId, setPathActive]);

  const convertToPDF = async (id, idRutina, modelo) => {
    try {
      const blob = await alumnoAdminApi.convertirAPDF(id, idRutina, modelo);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Rutina_${modelo}_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // liberar memoria
    } catch (error) {
      console.error("Error al convertir a PDF:", error);
    }
  };

  return { rutinas, loading, convertToPDF, idAlumno: userId };
};

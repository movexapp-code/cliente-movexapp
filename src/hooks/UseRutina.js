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
        const data = await alumnoAdminApi.getRutinasAlumno(userId);
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

  return { rutinas, loading };
};

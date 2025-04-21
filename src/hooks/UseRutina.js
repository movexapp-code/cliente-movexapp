import { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

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
        const response = await fetch(
          `http://localhost:8082/usuario/${userId}/rutinas/asignadas`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
            },
          }
        );
        if (!response.ok) throw new Error("Error al cargar las rutinas");
        const data = await response.json();
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

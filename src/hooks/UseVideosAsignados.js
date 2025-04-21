// src/hooks/useVideosAsignados.js
import { useEffect, useState } from "react";

export const useVideosAsignados = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtenemos el usuario del localStorage y lo parseamos
  const storedUser = localStorage.getItem("userMovex");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8082/usuario/${userId}/archivos/asignados`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "ad42fgte32gedrg4tvdf3HK6dsfHAS4",
            },
          }
        );
        if (!response.ok) throw new Error("Error al cargar los videos");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [userId]);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return { videos, loading, formatearFecha };
};

// src/hooks/useArchivos.js
import { useEffect, useState, useContext } from "react";
import { archivosAdminApi } from "../api/Admin/Archivos";
import { AppContext } from "../context/AppContext";

const archivosApi = new archivosAdminApi();

const useArchivos = () => {
  const { showAlert } = useContext(AppContext);

  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eliminarArchivo = async (id) => {
    try {
      const response = await archivosApi.eliminarArchivo(id);
      if (response.ok) {
        setArchivos((prev) => prev.filter((archivo) => archivo._id !== id));
        showAlert("Archivo eliminado correctamente", 5000);
      } else {
        console.error("Error al eliminar el archivo");
      }
    } catch (err) {
      console.error("Error al eliminar el archivo", err);
    }
  };

  const obtenerArchivos = async () => {
    try {
      setLoading(true);
      const response = await archivosApi.getArchivos();
      setArchivos(response);
    } catch (err) {
      console.error("Error al obtener archivos", err);
      setError("Error al obtener archivos");
    } finally {
      setLoading(false);
    }
  };

  const subirArchivo = async (file, nombre = "", descripcion = "") => {
    if (!file) {
      console.error("No se ha seleccionado un archivo");
      return;
    }
    setLoading(true);

    try {
      const nuevoArchivo = await archivosApi.subirArchivo(
        file,
        nombre,
        descripcion
      );
      setArchivos((prev) => [...prev, nuevoArchivo]);
      if (nuevoArchivo.ok == true) {
        showAlert("Archivo subido correctamente", 5000);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error al subir archivo", err);
    }
  };

  useEffect(() => {
    obtenerArchivos();
  }, []);

  return { archivos, loading, error, subirArchivo, eliminarArchivo };
};

export default useArchivos;

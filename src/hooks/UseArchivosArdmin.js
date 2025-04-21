/* eslint-disable react-hooks/exhaustive-deps */
// src/hooks/useArchivos.js
import { useEffect, useState, useContext } from "react";
import { archivosAdminApi } from "../api/Admin/Archivos";
import { AppContext } from "../context/AppContext";

const archivosApi = new archivosAdminApi();

const useArchivos = () => {
  const { showAlert } = useContext(AppContext);
  const id = JSON.parse(localStorage.getItem("userMovex"))._id;
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerArchivos = async () => {
    try {
      setLoading(true);
      const response = await archivosApi.getArchivosAdmin(id);
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
    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);

    try {
      const nuevoArchivo = await archivosApi.subirArchivoNuevo(formData, id);
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

  return { archivos, loading, error, subirArchivo };
};

export default useArchivos;

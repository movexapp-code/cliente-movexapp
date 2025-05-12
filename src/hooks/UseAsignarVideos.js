import { useCallback, useEffect, useMemo, useState } from "react";
import { archivosAdminApi } from "../api/Admin/Archivos";
import { AlumnosAdminApi } from "../api/Admin/Alumnos";

const alumnosApi = new AlumnosAdminApi();
const archivosApi = new archivosAdminApi();

export const useAsignarVideos = (alumnoId, showAlert) => {
  const [archivos, setArchivos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subiendo, setSubiendo] = useState(false);

  const fetchAlumno = useCallback(async () => {
    try {
      const data = await alumnosApi.getAlumno(alumnoId);
      setAlumno(data);
    } catch (error) {
      console.error("Error al obtener alumno:", error);
    }
  }, [alumnoId]);

  const fetchArchivos = useCallback(async () => {
    try {
      const data = await archivosApi.getArchivos();
      setArchivos(data);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
    }
  }, []);

  useEffect(() => {
    if (!alumnoId) return;
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchAlumno(), fetchArchivos()]);
      setLoading(false);
    };
    fetchData();
  }, [alumnoId, fetchAlumno, fetchArchivos]);

  const archivosFiltrados = useMemo(() => {
    return archivos.filter(
      (archivo) => !alumno?.archivosAsignados?.includes(archivo._id)
    );
  }, [archivos, alumno]);

  const handleSeleccion = useCallback((id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const asignarArchivos = useCallback(async () => {
    if (seleccionados.length === 0) {
      showAlert("Selecciona al menos un archivo", 3000);
      return;
    }
    try {
      setLoading(true);
      await archivosApi.asignarArchivos(alumnoId, seleccionados);
      await fetchAlumno(); // actualizamos datos del alumno
      showAlert("Archivos asignados correctamente", 3000);
      setSeleccionados([]);
    } catch (err) {
      console.error("Error al asignar archivos", err);
    } finally {
      setLoading(false);
    }
  }, [seleccionados, alumnoId, fetchAlumno, showAlert]);

  const subirArchivo = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setSubiendo(true);
      try {
        await archivosApi.subirArchivo(file, "archivo nuevo");
        await fetchArchivos();
      } catch (err) {
        console.error("Error al subir archivo", err);
      } finally {
        setSubiendo(false);
      }
    },
    [fetchArchivos]
  );

  return {
    archivosFiltrados,
    archivos,
    alumno,
    seleccionados,
    subiendo,
    loading,
    handleSeleccion,
    asignarArchivos,
    subirArchivo,
  };
};

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import AlumnoApi from "../api/AlumnoApi";

const alumnoApi = new AlumnoApi();

export const useArchivosAlumno = () => {
  const { user, showAlert, uploadUser, loading, setLoading } = useContext(AppContext);

  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user, setLoading]);

  const subirArchivo = async (formData) => {
    setLoading(true);
    try {
      const response = await alumnoApi.subirArchivo(user._id, formData);
      if (!response.ok) {
        showAlert("Error al subir el archivo", 5000);
      } else {
        // Actualizamos el usuario en el contexto global
        await uploadUser();

        showAlert("Archivo subido correctamente", 5000);
      }
      // Actualizamos los archivos en el contexto global

      return true;
    } catch (err) {
      console.error("Error al subir archivo:", err);
      showAlert("Error al subir el archivo. Intenta nuevamente.", 5000);
      setError("Error al subir el archivo. Intenta nuevamente.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    modalOpen,
    setModalOpen,
    subirArchivo,
  };
};

import { useContext, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import AlumnoApi from "../api/AlumnoApi";

const alumnoApi = new AlumnoApi();

export const useArchivosAlumno = () => {
  const { user, showAlert, uploadUser, loading, setLoading } =
    useContext(AppContext);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const subirArchivo = useCallback(
    async (formData) => {
      if (!user?._id) {
        setError("Usuario no identificado");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await alumnoApi.subirArchivo(user._id, formData);

        if (!response.ok) {
          showAlert("Error al subir el archivo", 5000);
          return false;
        }

        await uploadUser();
        showAlert("Archivo subido correctamente", 5000);
        return true;
      } catch (err) {
        console.error("Error al subir archivo:", err);
        const message = "Error al subir el archivo. Intenta nuevamente.";
        showAlert(message, 5000);
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user, uploadUser, showAlert, setLoading]
  );

  return {
    user,
    loading,
    error,
    modalOpen,
    setModalOpen,
    subirArchivo,
  };
};

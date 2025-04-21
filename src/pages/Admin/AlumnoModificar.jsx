import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/AlumnoModificar.css"; // Asegúrate de tener este archivo CSS
import { AlumnosAdminApi } from "../../api/Admin/Alumnos";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const alumnosApi = new AlumnosAdminApi();

const AlumnoModificar = () => {
  const { showAlert } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  let alumno = location.state?.alumno;
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ ...alumno });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Datos actualizados:", formData);
    const camposActualizados = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (alumno[key] !== value) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    console.log("Campos actualizados:", camposActualizados);
    // enviar al backend
    try {
      const response = await alumnosApi.updateAlumno(alumno._id, {
        ...camposActualizados,
      });
      console.log("Respuesta del servidor:", response);
      if (response.ok) {
        showAlert("Datos actualizados correctamente", 5000);

        // volver al alumno
      } else {
        showAlert("Error al actualizar los datos", 5000);
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    } finally {
      navigate(`/admin/alumno/${alumno._id}`);
      setLoading(false);
    }
  };

  if (loading) {
    <Loader message={"Actualizando Datos"} />;
  }

  if (!alumno) return <p>Cargando datos...</p>;

  return (
    <div className="alumno-modificar__container">
      <h2 className="alumno-modificar__titulo">Modificar Datos del Alumno</h2>
      <form className="alumno-modificar__form" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => {
          // Evitar campos como array de objetos o no modificables si lo deseás
          if (
            key === "_id" ||
            key === "__v" ||
            key === "activo" ||
            key === "updatedAt" ||
            key === "createdAt"
          )
            return null;

          if (Array.isArray(value)) return null;

          const isBoolean = typeof value === "boolean";

          return (
            <div
              key={key}
              className={`alumno-modificar__campo ${
                isBoolean ? "alumno-modificar__campo--checkbox" : ""
              }`}
            >
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {isBoolean ? (
                <input
                  id={key}
                  name={key}
                  type="checkbox"
                  checked={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}

        <div className="alumno-modificar__acciones">
          <button type="submit" className="alumno-modificar__boton">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default AlumnoModificar;

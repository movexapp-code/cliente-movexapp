import React, { useState, useContext } from "react";
import { AlumnosAdminApi } from "../../api/Admin/Alumnos";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import "./css/CrearAlumno.css";
import { useNavigate } from "react-router-dom";

const alumnosApi = new AlumnosAdminApi();

export default function CrearAlumno() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AppContext);
  const [alumno, setAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipoAlumno: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setAlumno((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await alumnosApi.crearAlumno(alumno);
      if (response.ok) {
        showAlert("Alumno creado correctamente", 5000);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);

        setAlumno({
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          tipoAlumno: "",
        });
      } else {
        showAlert(response.message || "Error al crear alumno", 5000);
      }
    } catch (err) {
      console.error("Error creando alumno:", err);
      showAlert("Error de servidor", 5000);
    }
  };

  if (loading) return <Loader message="Creando alumno..." />;

  return (
    <div className="crear-alumno-container">
      <h2>Crear Nuevo Alumno</h2>
      <form onSubmit={handleSubmit} className="crear-alumno-form">
        <label>
          Nombre
          <input
            type="text"
            name="nombre"
            value={alumno.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </label>

        <label>
          Apellido
          <input
            type="text"
            name="apellido"
            value={alumno.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={alumno.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </label>

        <label>
          Contraseña
          <input
            type="text"
            name="password"
            value={alumno.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
        </label>

        <label>
          Tipo de Alumno
          <select
            name="tipoAlumno"
            value={alumno.tipoAlumno}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona nivel...</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </label>

        <button type="submit">Crear Alumno</button>
      </form>
    </div>
  );
}

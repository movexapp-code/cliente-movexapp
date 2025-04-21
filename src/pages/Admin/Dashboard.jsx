// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlumnosAdminApi } from "../../api/Admin/Alumnos";
import "./css/Dashboard.css"; // Importa el archivo CSS
import Loader from "../../components/Loader";

const alumnosApi = new AlumnosAdminApi();

export default function Dashboard() {
  const [alumnos, setAlumnos] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const data = await alumnosApi.getAlumnos();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al obtener alumnos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <div className="dashboard-alumnos">
      <h1 className="dashboard-alumnos__titulo">Panel de Alumnos</h1>
      <div className="dashboard-alumnos__tabla-container">
        <table className="dashboard-alumnos__tabla">
          <thead>
            <tr className="dashboard-alumnos__encabezado">
              <th className="dashboard-alumnos__th text-left">Nombre</th>
              <th className="dashboard-alumnos__th text-left">Email</th>
              <th className="dashboard-alumnos__th text-left">Tipo</th>
              <th className="dashboard-alumnos__th text-center">IMC</th>
              <th className="dashboard-alumnos__th text-center">% Grasa</th>
              <th className="dashboard-alumnos__th text-center">% Músculo</th>
              <th className="dashboard-alumnos__th text-center">Creado</th>
              <th className="dashboard-alumnos__th text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              alumnos.map((alumno) => (
                <tr key={alumno._id} className="dashboard-alumnos__fila">
                  <td className="dashboard-alumnos__td">
                    {alumno.nombre} {alumno.apellido}
                  </td>
                  <td className="dashboard-alumnos__td">{alumno.email}</td>
                  <td className="dashboard-alumnos__td capitalize">
                    {alumno.tipoAlumno}
                  </td>
                  <td className="dashboard-alumnos__td text-center">
                    {alumno.imc}
                  </td>
                  <td className="dashboard-alumnos__td text-center">
                    {alumno.porcentajeGrasa}%
                  </td>
                  <td className="dashboard-alumnos__td text-center">
                    {alumno.porcentajeMusculo}%
                  </td>
                  <td className="dashboard-alumnos__td text-center">
                    {new Date(alumno.createdAt).toLocaleDateString()}
                  </td>
                  <td className="dashboard-alumnos__td text-center">
                    <button
                      onClick={() => navigate(`/admin/alumno/${alumno._id}`)}
                      className="dashboard-alumnos__boton-ver"
                    >
                      Ver Alumno
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="dashboard-alumnos__sin-datos">
                  <Loader message={"Cargando los alumnos..."} />
                </td>
              </tr>
            )}
            {alumnos.length === 0 && (
              <tr>
                <td colSpan="8" className="dashboard-alumnos__sin-datos">
                  No hay alumnos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

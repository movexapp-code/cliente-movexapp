import { BiSolidFilePlus } from "react-icons/bi";
import "./css/archivosSubidosAlumno.css";
import NewFileModal from "../components/NewFileModal";
import { useArchivosAlumno } from "../hooks/UseArchivosAlumno";
import Loader from "../components/Loader";

export default function ArchivosSubidosAlumno() {
  const { user, loading, error, modalOpen, setModalOpen, subirArchivo } =
    useArchivosAlumno();

  if (loading) return <Loader message="Actualizando Archivos..." />;
  if (error) return <p className="error">{error}</p>;

  const archivos = user?.archivos || [];

  return (
    <div className="archivos-subidos-container">
      <h2>Archivos Subidos por el Alumno</h2>

      <button
        className="subir-archivo-alumno"
        onClick={() => setModalOpen(true)}
      >
        <BiSolidFilePlus className="icon-archivo" />
        Nuevo Archivo
      </button>

      {archivos.length === 0 ? (
        <p className="sin-archivos">
          No tienes archivos subidos. ¡Sube uno nuevo!
        </p>
      ) : (
        <table className="table-archivos-alumno">
          <thead className="table-archivos-alumno-thead">
            <tr>
              <th>N°</th>
              <th>Nombre del Archivo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody className="table-archivos-alumno-tbody">
            {archivos.map(({ nombre, url }, index) => (
              <tr key={index} className="table-tr-archivos-alumno">
                <td>{index + 1}</td>
                <td>{nombre}</td>
                <td>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ver-archivo-link"
                    >
                      Ver Archivo
                    </a>
                  ) : (
                    <span>No disponible</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <NewFileModal
          onClose={() => setModalOpen(false)}
          onSubmit={subirArchivo}
        />
      )}
    </div>
  );
}

import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Loader from "./components/Loader"; // Asegurate de tener un Loader
import VideosGenerales from "./pages/Admin/VideosGenerales";

// Lazy imports
const Home = React.lazy(() => import("./pages/Home"));
const Videos = React.lazy(() => import("./pages/Videos"));
const Rutinas = React.lazy(() => import("./pages/Rutina"));
const Perfil = React.lazy(() => import("./pages/Perfil"));
const Formulario = React.lazy(() => import("./pages/Formulario"));
const VideosAsignados = React.lazy(() => import("./pages/VideosAsignados"));
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));
const AlumnoDetalle = React.lazy(() => import("./pages/Admin/AlumnoDetalle"));
const AlumnoModificar = React.lazy(() => import("./pages/Admin/AlumnoModificar"));
const AlumnoRutinas = React.lazy(() => import("./pages/Admin/AlumnoRutinas"));
const AlumnoRutinaVer = React.lazy(() => import("./pages/Admin/AlumnoRutinaVer"));
const AgregarRutinaNueva = React.lazy(() => import("./pages/Admin/AgregarRutinaNueva"));
const RespuestasFormulario = React.lazy(() => import("./pages/Admin/RespuestasFormulario"));
const FormularioPreguntas = React.lazy(() => import("./pages/Admin/FormularioPreguntas"));
const AsignarVideos = React.lazy(() => import("./pages/Admin/AsignarVideos"));
const ArchivosSubidosAlumno = React.lazy(() => import("./pages/ArchivosSubidosAlumno"));
const CrearAlumno = React.lazy(() => import("./pages/Admin/CrearAlumno.jsx"));
const RutinasGenerales = React.lazy(() => import("./pages/Admin/RutinasGenerales.jsx"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "formulario",
        element: (
          <Suspense fallback={<Loader />}>
            <Formulario />
          </Suspense>
        ),
      },
      {
        path: "videos-asignados",
        element: (
          <Suspense fallback={<Loader />}>
            <VideosAsignados />
          </Suspense>
        ),
      },
      {
        path: "videos",
        element: (
          <Suspense fallback={<Loader />}>
            <Videos />
          </Suspense>
        ),
      },
      {
        path: "rutinas",
        element: (
          <Suspense fallback={<Loader />}>
            <Rutinas />
          </Suspense>
        ),
      },
      {
        path: "archivos",
        element: (
          <Suspense fallback={<Loader />}>
            <ArchivosSubidosAlumno />
          </Suspense>
        ),
      },
      {
        path: "perfil",
        element: (
          <ProtectedRoute allowedRoles={["alumno"]}>
            <Suspense fallback={<Loader />}>
              <Perfil />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "alumno"]}>
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AlumnoDetalle />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/modificar",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AlumnoModificar />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/rutina",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AlumnoRutinas />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/rutina/ver",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AlumnoRutinaVer />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/rutina/agregar-rutina",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AgregarRutinaNueva />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/respuestas",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <RespuestasFormulario />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/preguntas-formulario",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <FormularioPreguntas />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/alumno/:id/videos-asignar",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <AsignarVideos />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/archivos",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <VideosGenerales/>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/crear-alumno",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <CrearAlumno/>
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/rutinas-generales",
        element: (
          <ProtectedRoute allowedRoles={["alumno", "administrador"]}>
            <Suspense fallback={<Loader />}>
              <RutinasGenerales/>
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);


const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;

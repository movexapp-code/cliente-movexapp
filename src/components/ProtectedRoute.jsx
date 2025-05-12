import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AppContext);
  console.log(user.rol);
  if (!allowedRoles.includes(user.rol)) return <Navigate to="/" />;
  return children;
};

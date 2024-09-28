import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("accessToken"); // Verifica si hay un token en el localStorage

  // Si hay un token, renderiza los componentes hijos (Outlet); de lo contrario, redirige a /login
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

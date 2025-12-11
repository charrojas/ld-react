import { Navigate } from "react-router-dom";
import { usePaginaLogIn } from "../../pages/login/store";
import type { JSX } from "react";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente interface para proteger rutas. Solo permite el acceso si el usuario está autenticado.

interface PrivateRouteProps {
  children: JSX.Element; 
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const usuarioAutenticado = usePaginaLogIn(state => state.usuarioAutenticado);

  if (!usuarioAutenticado) {
    return <Navigate to="/login" replace />; 
  }

  return children;
};

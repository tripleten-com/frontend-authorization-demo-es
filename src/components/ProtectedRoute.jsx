import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
}) {
  const location = useLocation();
  const from = location.state?.from || "/";
  // Si el usuario ha iniciado la sesión le redirigimos fuera de nuestras
  // rutas anónimas.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  // Si el usuario no ha iniciado la sesión e intenta acceder a una ruta que
  // requiere autorización, le redirigimos a la ruta /login.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // En caso contrario, muestra los hijos de la ruta actual.
  return children;
}

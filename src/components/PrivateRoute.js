import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  // Si no hay token, redirige a la página de login
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // Si hay token, permite el acceso a la ruta
  return children;
};

export default PrivateRoute;

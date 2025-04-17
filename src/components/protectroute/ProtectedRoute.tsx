import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  if (!allowedRoles.includes(role!)) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;

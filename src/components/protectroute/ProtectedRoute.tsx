import React from "react";
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {

  let role = localStorage.getItem("role")
  
  if (!allowedRoles.includes(role!)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;

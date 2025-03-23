import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/auth.context";
import { SkeletonCard } from "../loading-skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectPath = "/" }) => {
  const { isAuthenticated, isLoadingProfile } = useAuth();

  if (isLoadingProfile) {
    return <SkeletonCard />;
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

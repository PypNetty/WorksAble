// components/auth/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "../common/LoadingSpinner"; // Chemin relatif

const ProtectedRoute = ({ requiredRole, children }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute State:", {
    user,
    isAuthenticated,
    loading,
    requiredRole,
    currentPath: location.pathname,
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    console.log("Redirection vers login: Non authentifié");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user.userType !== requiredRole) {
    console.log("Redirection: Mauvais rôle");
    return (
      <Navigate
        to={
          user.userType === "candidate" ? "/dashboard" : "/dashboard/recruiter"
        }
        replace
      />
    );
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

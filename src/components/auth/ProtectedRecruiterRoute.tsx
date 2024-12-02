// components/auth/ProtectedRecruiterRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRecruiterRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "recruiter") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRecruiterRoute;

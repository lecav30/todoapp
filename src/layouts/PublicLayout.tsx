import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}

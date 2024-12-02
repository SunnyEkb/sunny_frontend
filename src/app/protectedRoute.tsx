import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../store/auth-api/authApi";
import { paths } from "./paths";
//import { useAppSelector } from "../store/store";

const ProtectedRoute: FC = () => {
  const [checkAuth, data] = useLazyCheckAuthQuery();

  useEffect(() => {
    checkAuth();
  }, []);

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.error) {
    return <Navigate to={paths.auth} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

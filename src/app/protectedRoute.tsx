import { FC, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../store/auth-api/authApi";
import { paths } from "./paths";
//import { useAppSelector } from "../store/store";

const ProtectedRoute: FC = () => {
  const [checkAuth, data] = useLazyCheckAuthQuery();

  const initCheckAuth = async () => {
    return await checkAuth();
  };


  useEffect(() => {
    initCheckAuth();
  }, []);

  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  if (data.error || data.isError || data.status == "rejected") {
    return <Navigate to={paths.auth} />;
  }


  return <Outlet />;
};

export default ProtectedRoute;

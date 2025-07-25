/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../store/auth-api/authApi";
import { paths } from "./paths";
import { useAppSelector } from "../store/store";
//import { useAppSelector } from "../store/store";

const ProtectedRoute: FC = () => {
  const [checkAuth, {isLoading, isError }] = useLazyCheckAuthQuery();
  const location = useLocation();

  const initCheckAuth = async () => {
    return await checkAuth();
  };

  const userProfile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    initCheckAuth()

    console.log(userProfile?.role)
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to={paths.auth} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

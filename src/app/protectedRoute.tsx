/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { authApi } from "../store/auth-api/authApi";
import { paths } from "./paths";
import store, { useAppSelector } from "../store/store";
import React from "react";
//import { useAppSelector } from "../store/store";

export const loaderProtectedRoute = async () => {
  try {
    const result = await store.dispatch(authApi.endpoints.checkAuth.initiate());
    return result.data;
  } catch (e) {
    return { error: "Unknown error" };
  }
};

const ProtectedRoute: FC = () => {
  // const [checkAuth, { isLoading, isError }] = useLazyCheckAuthQuery();
  const location = useLocation();
  const [isLoading, setLoading] = React.useState(true);

  const user = useLoaderData();
  // console.log('user', user)

  // const initCheckAuth = async () => {
  //   return await checkAuth();
  // };

  const userProfile = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // initCheckAuth();

    if (userProfile) {
      setLoading(false);
    }

    console.log(userProfile?.role);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user.error) {
    return <Navigate to={paths.auth} />;
  }

  if (
    userProfile?.role === "moderator" &&
    location.pathname !== paths.moderation
  ) {
    return <Navigate to={paths.moderation} replace />;
  }

  // Если обычный пользователь пытается попасть на страницу модерации
  if (
    userProfile?.role !== "moderator" &&
    location.pathname === paths.moderation
  ) {
    return <Navigate to={paths.index} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

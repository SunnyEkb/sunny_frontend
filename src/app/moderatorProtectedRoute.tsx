import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { paths } from "./paths";

const ModeratorProtectedRoute: FC = () => {

  const userProfile = useAppSelector((state) => state.auth.user);

  if (userProfile?.role !== 'moderator') {
    return <Navigate to={paths.index} replace />;
  }

  return <Outlet />;
};

export default ModeratorProtectedRoute;

import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { paths } from "./paths";

const ModeratorProtectedRoute: FC = () => {
  const location = useLocation();
  const userProfile = useAppSelector((state) => state.auth.user);

  if (!userProfile) {
    return <Navigate to={paths.auth} state={{ from: location }} replace />;
  }

  if (userProfile.role !== 'moderator') {
    return <Navigate to={paths.index} replace />;
  }

  return <Outlet />;
};

export default ModeratorProtectedRoute;

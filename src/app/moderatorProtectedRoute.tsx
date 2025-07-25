import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { paths } from "./paths";

const ModeratorProtectedRoute: FC = () => {

  const userProfile = useAppSelector((state) => state.auth.user);

  if (userProfile?.role !== 'moderator') {
    return <Navigate to={paths.index} replace />;
  }

    // // Если пользователь модератор и пытается попасть не на страницу модерации
    if (userProfile?.role === 'moderator' && location.pathname !== paths.moderation) {
      return <Navigate to={paths.moderation} replace />;
    }

    // Если обычный пользователь пытается попасть на страницу модерации
    if (userProfile?.role !== 'moderator' && location.pathname === paths.moderation) {
      return <Navigate to={paths.index} replace />;
    }

  return <Outlet />;
};

export default ModeratorProtectedRoute;

import { Navigate } from "react-router-dom";
import { useMediaQuery } from "../shared/hooks/useMediaQuery";

const MobileOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default MobileOnlyRoute;


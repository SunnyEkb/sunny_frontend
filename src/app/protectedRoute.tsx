import { FC } from "react";
import { Outlet } from "react-router-dom";
import Login from "../user/pages/logIn/logIn";

const ProtectedRoute: FC = () => {
  const mockToken = "mock"; // тут должна быть какая то логика по проверке наличия токена

  return mockToken ? <Outlet /> : <Login />;
};

export default ProtectedRoute;

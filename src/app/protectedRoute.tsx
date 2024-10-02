import { FC, useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";
import Login from "../user/pages/logIn/logIn";
import MainLayout from "./layouts/MainLayout";
import { paths } from "./paths";
import { useLazyCheckAuthQuery } from "../store/auth-api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";


const ProtectedRoute: FC = () => {
  //const mockToken = "mock"; // тут должна быть какая то логика по проверке наличия токена

  const mockToken = true; // тут должна быть какая то логика по проверке наличия токена


  // Если запрос успешен, перенаправляем на Outlet
  //return mockToken ? <Outlet /> : <Login/>;
  return mockToken ? <MainLayout /> : <Login/>;

};


export default ProtectedRoute;



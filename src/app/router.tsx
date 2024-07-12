import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import Catalogs from "../user/pages/catalogs/catalogs";
import Catalog from "../user/pages/catalog/catalog";
import Registr from "../user/pages/singin/SignIn";
import ProtectedRoute from "./protectedRoute";
//import { useCheckAuthQuery } from "../store/auth-api/authApi";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [

      {
        path: paths.catalog,
        element: <Catalog />,
      },
      {
        path: paths.settings,
        element: <UserLK />,
      },
    ]
  },
  {
    path: paths.catalogs,
    element: <Catalogs />,
  },
  {
    path: paths.auth,
    element: <Login />,
  },
  {
    path: paths.register,
    element: <Registr />,
  },

]);


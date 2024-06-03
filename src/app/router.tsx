import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import Catalogs from "../user/pages/catalogs/catalogs";
import Catalog from "../user/pages/catalog/catalog";

export const router = createBrowserRouter([
  {
    path: paths.catalogs,
    element: <Catalogs />,
  },
  {
    path: paths.catalog,
    element: <Catalog />,
  },
  {
    path: paths.auth,
    element: <Login />,
  },
  {
    path: paths.settings,
    element: <UserLK />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import Catalogs, { loaderCatagories } from "../ads/pages/catalogs/catalogs";

import Catalog from "../ads/pages/catalog/catalog";
import CardCatalogBig from "../ads/pages/CardCatalogBig/CardCatalogBig";
import Registr from "../user/pages/singin/SignIn";
import ProtectedRoute from "./protectedRoute";
import PolicyPage from "../user/pages/PolicyPage/PolicyPage";
import TypeCatalog, { loaderTypesCatalog } from "../ads/pages/typeCatalog/TypeCatalog";
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
    ],
  },
  {
    path: paths.catalogAds,
    element: <CardCatalogBig />,
  },
  {
    path: paths.typeCatalog,
    element: <TypeCatalog />,
    loader: loaderTypesCatalog,
  },
  {
    path: paths.catalogs,
    element: <Catalogs />,
    loader: () => loaderCatagories(),
  },
  {
    path: paths.auth,
    element: <Login />,
  },
  {
    path: paths.register,
    element: <Registr />,
  },
  {
    path: paths.policy,
    element: <PolicyPage />,
  },
]);

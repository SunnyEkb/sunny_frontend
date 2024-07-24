import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import Catalogs from "../user/pages/catalogs/catalogs";
import Catalog, { loaderCatalog } from "../user/pages/catalog/catalog";
import CardCatalogBig from "../user/pages/CardCatalogBig/CardCatalogBig";

export const router = createBrowserRouter([
  {
    path: paths.catalogs,
    element: <Catalogs />,
  },
  {
    path: paths.catalog,
    element: <Catalog />,
    loader: (params) => loaderCatalog(params),
  },
  {
    path: paths.catalogAds,
    element: <CardCatalogBig />,
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

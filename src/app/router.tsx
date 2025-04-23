import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import MainCatalog, {
  loaderCatagories,
} from "../ads/pages/catalogs/new/MainCatalog";
import Catalog from "../ads/pages/catalog/catalog";
import CardCatalogBig, {
  loaderAdsByCatalogId,
} from "../ads/pages/CardCatalogBig/CardCatalogBig";
import Registr from "../user/pages/singin/SignIn";
import ProtectedRoute from "./protectedRoute";
import PolicyPage from "../user/pages/PolicyPage/PolicyPage";
import TypeCatalog, {
  loaderTypesCatalog,
} from "../ads/pages/typeCatalog/TypeCatalog";
import MainLayout from "./layouts/MainLayout";
import SettingsUser from "../user/pages/settingsUser/SettingsUser";
import UserProfileEdit from "../user/pages/UserProfileEdit/UserProfileEdit";
import CreateAds from "../ads/pages/createAds/CreateAds";
import MainFormAds from "../ads/pages/createAds/mainForm";
import PasswordRecovery from "../user/pages/passwordRecovery/passwordRecovery";
import NewPassword from "../user/pages/newPassword/newPassword";
import RegisterActivatePage from "../user/pages/registerActivate/registerActivate";
import ChatPage from "../ads/pages/chatPage/chatPage";
import ModerationPage from "../ads/pages/moderation/ModerationPage"; // Importing ModerationPage


export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />, // Wrap ModerationPage in ProtectedRoute
      children: [
        {
          path: paths.profile,
          element: <UserLK />,
        },
        {
          path: paths.settings,
          element: <SettingsUser />,
        },
        {
          path: paths.user_profile_edit,
          element: <UserProfileEdit />,
        },
        {
          path: paths.moderation, // Adding the moderation route here
          element: <ModerationPage />,
        },
      ],
    },
    {
      element: <MainLayout />,
      children: [
        {
          path: paths.chat,
          element: <ChatPage />,
        },
        {
          path: paths.catalog,
          element: <Catalog />,
        },
        {
          path: paths.catalogAds,
          element: <CardCatalogBig />,
          loader: (params) => loaderAdsByCatalogId(params),
        },

        {
          path: paths.createAds,
          element: <CreateAds />,
          children: [
            {
              path: paths.createAds,
              element: <MainFormAds />,
              loader: () => loaderCatagories(),
            },
          ],
        },

        {
          path: paths.typeCatalog,
          element: <TypeCatalog />,
          loader: loaderTypesCatalog,
        },
        {
          path: paths.index,
          element: <MainCatalog />,
          loader: () => loaderCatagories(),
        },
      ],
    },
    {
      path: paths.auth,
      element: <Login />,
    },
    {
      path: paths.forgetPassword,
      element: <NewPassword />,
    },
    {
      path: paths.passwordRecovery,
      element: <PasswordRecovery />,
    },
    {
      path: paths.register,
      element: <Registr />,
    },
    {
      path: paths.policy,
      element: <PolicyPage />,
    },
    {
      path: paths.registryActivate,
      element: <RegisterActivatePage />,
    },
  ],

  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

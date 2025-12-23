import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "../user/pages/logIn/logIn";
import UserLK from "../user/pages/userLK/userLK";
import MainCatalog, {
  loaderCatagories,
} from "../ads/pages/catalogs/new/MainCatalog";
import Catalog, { LoaderInitPage } from "../ads/pages/catalog/catalog";
import CardCatalogBig, {
  loaderAdsByCatalogId,
} from "../ads/pages/CardCatalogBig/CardCatalogBig";
import Registr from "../user/pages/singin/SignIn";
import ProtectedRoute, { loaderProtectedRoute } from "./protectedRoute";
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
import ConfirmEmail from "../user/pages/confirmEmail/confirmEmail";
import { UserFavorites } from "../user/pages/UserFavorites/UserFavorites";
import { UserAds } from "../user/pages/UserAds/UserAds";
import PasswordChange from "../user/pages/passwordChange/passwordChange";
import { SearchProvider } from "./layouts/SearchProvider/SearchProvider";

export const router = createBrowserRouter(
  [
    {
      element: <ProtectedRoute />,
      loader: loaderProtectedRoute, // Wrap ModerationPage in ProtectedRoute
      children: [
        // {
        //   // Отдельная группа для модерации
        //   element: <ModeratorProtectedRoute />,
        //   children: [
        {
          path: paths.moderation,
          element: <ModerationPage />,
        },
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
          path: paths.passwordChange,
          element: <PasswordChange />,
        },
      ],
    },
    {
      element: (
        <SearchProvider>
          <MainLayout />
        </SearchProvider>
      ),
      path: paths.index,
      children: [
        {
          path: paths.chat,
          element: <ChatPage />,
        },
        {
          path: paths.catalog,
          element: <Catalog />,
          loader: LoaderInitPage,
        },
          {
          path: paths.catalogService,
          element: <CardCatalogBig />, // убрать
          loader: (params) => loaderAdsByCatalogId(params),
        },
        {
          path: paths.adPage,
          element: <CardCatalogBig />, // убрать
          loader: (params) => loaderAdsByCatalogId(params),
        },

        {
          path: paths.createAds,
          element: <CreateAds />,
          loader: () => loaderCatagories(),
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
        {
          path: paths.favorites,
          element: <UserFavorites />,
        },
        {
          path: paths.myAds,
          element: <UserAds />,
        },
      ],
    },
    // ],

    //   ],
    // },
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
      path: paths.confirmEmail,
      element: <ConfirmEmail />,
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

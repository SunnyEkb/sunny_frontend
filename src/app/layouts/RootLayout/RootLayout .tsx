import { Outlet, useLocation } from "react-router-dom";
import AuthModal from "../../../user/components/userAuthModal/AuthModal";
import { useAuthModal } from "../../../user/providers/AuthModalContext";
import { SearchProvider } from "../SearchProvider/SearchProvider";
import MainLayout from "../MainLayout";
import { paths } from "../../paths";

const RootLayout = () => {
  const { isOpen } = useAuthModal();
  const path = useLocation();

  return (
    <>
      {path.pathname === paths.profile ? (
        <Outlet />
      ) : (
        <SearchProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </SearchProvider>
      )}

      {isOpen && <AuthModal />}
    </>
  );
};

export default RootLayout;

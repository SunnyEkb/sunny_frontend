import { Outlet } from "react-router-dom";
import AuthModal from "../../../user/components/userAuthModal/AuthModal";
import { useAuthModal } from "../../../user/providers/AuthModalContext";

const RootLayout = () => {
   const {isOpen} = useAuthModal();

  return (
    <>
      <Outlet />
      {isOpen && <AuthModal/>}
    </>
  );
};

export default RootLayout;

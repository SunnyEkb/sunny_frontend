import { RootModal } from "../../../app/layouts/RootModal/RootModal";
import LogIn from "../../pages/logIn/logIn";
import Registr from "../../pages/singin/SignIn";
import { useAuthModal } from "../../providers/AuthModalContext";

const AuthModal = () => {
  const { type, closeAuthModal } = useAuthModal();

  return (
    <RootModal onClose={closeAuthModal}>
      {type === "login" && <LogIn />}
      {type === "register" && <Registr />}
    </RootModal>
  );
};

export default AuthModal;

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAppSelector } from "../../store/store";

type AuthType = "login" | "register";

interface AuthModalContext {
  isOpen: boolean;
  type: AuthType;
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContext | null>(null);

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal может использоваться только внутри AuthModalProvider");
  }
  return ctx;
};

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const userIsAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<AuthType>("login");

  useEffect(() => {
    if (isOpen && userIsAuth) {
      setIsOpen(false);
    }
  }, [isOpen, userIsAuth]);

  const openLogin = useCallback(() => {
    setIsOpen(true);
    setType("login");
  }, []);

  const openRegister = useCallback(() => {
    setIsOpen(true);
    setType("register");
  }, []);

  const closeAuthModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      type,
      openLogin,
      openRegister,
      closeAuthModal,
    }),
    [isOpen, type, openLogin, openRegister, closeAuthModal]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

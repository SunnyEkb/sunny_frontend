import { useLocation } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";
import PcFooter from "../../user/components/footer/PcFooter";
import styles from "./MainLayout.module.scss";
import Header from "../../user/components/header/Header";
import { paths } from "../paths";
import { ReactNode } from "react";
import { useMediaQuery } from "../../shared/hooks/useMediaQuery";

export default function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isModerationPage = location.pathname === paths.moderation;
  const isChatPage = location.pathname.includes("/chat");
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <div className={styles.container}>
      {!isModerationPage && <Header />}
      <div className={isChatPage ? styles.contentChat : styles.content}>
        {children}
      </div>
      {!isModerationPage && isMobile && isChatPage ? <></> : <PcFooter />}
      {!isModerationPage && <FooterButtonMain />}
    </div>
  );
}

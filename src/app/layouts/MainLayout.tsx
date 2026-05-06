import { useLocation } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";
import PcFooter from "../../user/components/footer/PcFooter";
import styles from "./MainLayout.module.scss";
import Header from "../../user/components/header/Header";
import { paths } from "../paths";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isModerationPage = location.pathname === paths.moderation;

  return (
    <div className={styles.container}>
      {!isModerationPage && <Header />}
      <div className={styles.content}>{children}</div>
      {!isModerationPage && <PcFooter />}
      {!isModerationPage && <FooterButtonMain />}
    </div>
  );
}

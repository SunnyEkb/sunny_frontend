import { Outlet } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";
import PcFooter from "../../user/components/footer/PcFooter";
import styles from "./MainLayout.module.scss";
import Header from "../../user/components/header/Header";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.content}>
        <Outlet />
      </div>
      <PcFooter />
      <FooterButtonMain />
    </div>
  );
}

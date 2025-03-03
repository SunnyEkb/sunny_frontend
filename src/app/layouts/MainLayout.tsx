import { Outlet } from "react-router-dom";
import { FooterButtonMain } from "../../user/components/layout";
import PcFooter from "../../user/components/footer/PcFooter";
import styles from "./MainLayout.module.scss";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <PcFooter />
      <FooterButtonMain />
    </div>
  );
}

import { FC, ReactNode } from "react";
import styles from "./luthPageLayout.module.scss"
import CrossCloseButton from "../../../shared/crossCloseButton/crossCloseButton";
import PageTitle from "../../../shared/pageTitle/pageTitle";


interface AuthPageLayoutProps {
  title: string;
  onGoBack: () => void;
  children: ReactNode;
}

const AuthPageLayout: FC<AuthPageLayoutProps> = ({ title, onGoBack, children }) => (
  <div className={styles.authPageLayout}>
    <div className={styles.containerCloseButton}>
      <CrossCloseButton onClick={() => onGoBack()} />
    </div>
    <div className={styles.authPageLayout_containerTitle}>
      <PageTitle title={title} />
    </div>
    {children}
  </div>
);

export default AuthPageLayout;

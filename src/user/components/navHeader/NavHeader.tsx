import { FC } from "react";
import styles from "./navHeader.module.scss";
import { useNavigate } from "react-router-dom";

interface NavHeaderProps {
  title?: string;
  userLK?: boolean;
}

const NavHeader: FC<NavHeaderProps> = ({ title, userLK }) => {
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  const handleGoSettings = () => navigate("/settings");

  return (
    <header className={styles.header}>
      <div className={styles.navTitle}>
        <button className={styles.navTitle__backButton} onClick={handleGoBack}>
          ←
        </button>
        {title ? <h4 className={styles.navTitle__title}>{title}</h4> : null}
      </div>


      <div className={styles.icons}>

        {userLK ? <button className={styles.icon}>🔔</button> : null}

        {userLK ? (
          <button className={styles.icon} onClick={handleGoSettings}>
            ⚙️
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default NavHeader;

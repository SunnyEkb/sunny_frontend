import { FC } from "react";
import styles from "./navHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../../../assets/icon/arrow-left.svg";
import NotificationIcon from "../../../assets/icon/notification-icon.svg?react";
import { useGetNotificationsQuery } from "../../../store/entities/notifications/notifactionsApi";

interface NavHeaderProps {
  title?: string;
  userLK?: boolean;
}

const NavHeader: FC<NavHeaderProps> = ({ title, userLK }) => {
  const { data: notifications } = useGetNotificationsQuery();
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  const handleGoSettings = () => navigate("/settings");

  return (
    <header className={styles.header}>
      <div className={styles.navTitle}>
        <button className={styles.navTitle__backButton} onClick={handleGoBack}>
          <img src={arrowLeft} />
        </button>
        {title ? <h4 className={styles.navTitle__title}>{title}</h4> : null}
      </div>

      <div className={styles.icons}>
        <Link to="/notifications" className={styles.notificationLink}>
          <NotificationIcon />
          {!!notifications?.results.length && (
            <span className={styles.counter}>{notifications?.count}</span>
          )}
        </Link>

        <button className={styles.icon} onClick={handleGoSettings}>
          ⚙️
        </button>
      </div>
    </header>
  );
};

export default NavHeader;

import { useGetNotificationsQuery } from "../../../store/entities/notifications/notifactionsApi";
import NotificationIcon from "../../../assets/icon/notification-icon.svg?react";

import styles from "./style.module.scss";

export const NotificationsPage = () => {
  const { data: notifications } = useGetNotificationsQuery();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Уведомления</h1>

        {!!notifications?.results.length ? (
          <ul className={styles.notificationList}>
            {notifications.results.map((notification) => (
              <li key={notification.created_at} className={styles.notificationItem}>
                <span>{notification.text}</span>
              </li>
            ))}
          </ul>
        ) :
           <div className={styles.emptyNotification}>
            <NotificationIcon width={80} height={80} fill="transparent" />
            <p className={styles.emptyText}>У вас нет уведомлений</p>
          </div>
      }
      </div>
  );
};

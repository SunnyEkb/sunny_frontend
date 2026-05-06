import { useEffect, useRef } from "react";
import { Notification } from "../../store/entities/notifications/notifactionsApi";
import NotificationIcon from "../../assets/icon/notification-icon.svg?react";

import styles from "./style.module.scss";

interface TooltipNotificationProps {
  notifications: Notification[];
  closeTooltip: () => void;
}

export const TooltipNotification = ({
  notifications,
  closeTooltip,
}: TooltipNotificationProps) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        closeTooltip();
      }
    };

    document.addEventListener("click", clickOutside);

    return () => document.removeEventListener("click", clickOutside);
  }, [closeTooltip]);

  return (
    <div className={styles.tooltip} ref={tooltipRef}>
      <h2 className={styles.title}>Уведомления</h2>
      <div className={styles.content}>
        {!!notifications.length ? (
          <ul className={styles.notificationList}>
            {notifications.map((notification) => (
              <li
                key={notification.created_at}
                className={styles.notificationItem}
              >
                <span>{notification.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyNotification}>
            <NotificationIcon width={80} height={80} fill="transparent" />
            <p className={styles.emptyText}>У вас нет уведомлений</p>
          </div>
        )}
      </div>
    </div>
  );
};

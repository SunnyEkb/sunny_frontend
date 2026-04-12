/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../../../store/auth-api/authApi"; // update the import path as needed
import styles from "./header.module.scss";
import { paths } from "../../../app/paths";
import userIcon from "../../../assets/icon/menu/user.svg";
import { useSearch } from "../../../app/layouts/SearchProvider/SearchProvider";
import { useAuthModal } from "../../providers/AuthModalContext";
import { useGetNotificationsQuery } from "../../../store/entities/notifications/notifactionsApi";
import { useMediaQuery } from "../../../shared/hooks/useMediaQuery";
import { TooltipNotification } from "../../../shared/TooltipNotification/TooltipNotification";

import NotificationIcon from '../../../assets/icon/notification-icon.svg?react'

export default function Header() {
  const navigate = useNavigate();
  const [trigger, { data: user, isLoading }] = useLazyCheckAuthQuery();
  const [searchString, handleSearchItems] = useSearch();
  const { openLogin } = useAuthModal();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: notifications } = useGetNotificationsQuery(undefined, {
    skip: !isDesktop,
  });
  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const createAds = () => {
    if (!user) {
      openLogin();
      return;
    }
    navigate(paths.createAds);
  };

  const goToProfile = () => {
    if (!user) {
      navigate(paths.auth);
      return;
    }
    navigate(paths.profile);
  };

  // Trigger the checkAuth query to determine if the user is logged in
  useEffect(() => {
    if (!isLoading && !user) {
      trigger();
    }
  }, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <h1 className={styles.logo} onClick={() => navigate("/")}>
          Солнечный Екб
        </h1>
        {user ? (
          <div className={styles.navigate}>
            {" "}
            {isDesktop && isShowNotifications && (
              <TooltipNotification
                notifications={notifications?.results || []}
                closeTooltip={() => setIsShowNotifications(false)}
              />
            )}
            {isDesktop && (
              <button
                className={styles.notificationBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowNotifications((val) => !val);
                }}
              >
                <NotificationIcon/>
                {!!notifications?.results.length && <span className={styles.counter}>{notifications?.count}</span>}
              </button>
            )}
            <button className={styles.authButton} onClick={() => goToProfile()}>
              <img src={userIcon} alt="User" className={styles.userIcon} />
              Профиль
            </button>
          </div>
        ) : (
          <button
            className={styles.authButton}
            onClick={() => {
              openLogin();
            }}
          >
            Вход и регистрация
          </button>
        )}
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.searchWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            value={searchString}
            onChange={(event) => {
              handleSearchItems(event.target.value);
            }}
            type="text"
            placeholder="Поиск"
            className={styles.searchInput}
          />
        </div>

        <button
          type="button"
          className={styles.createButton}
          onClick={() => createAds()}
        >
          Создать объявление
        </button>
      </div>
    </header>
  );
}

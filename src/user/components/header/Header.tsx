/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../../../store/auth-api/authApi"; // update the import path as needed
import styles from "./header.module.scss";
import { paths } from "../../../app/paths";
import userIcon from "../../../assets/icon/menu/user.svg";
import { useSearch } from "../../../app/layouts/SearchProvider/SearchProvider";
import { useAuthModal } from "../../providers/AuthModalContext";

export default function Header() {
  const navigate = useNavigate();
  const [trigger, { data: user, isLoading }] = useLazyCheckAuthQuery();
  const [searchString, handleSearchItems] = useSearch();
  const { openLogin } = useAuthModal();

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
          <button className={styles.authButton} onClick={() => goToProfile()}>
            <img src={userIcon} alt="User" className={styles.userIcon} />
            Профиль
          </button>
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

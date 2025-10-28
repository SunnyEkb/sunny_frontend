/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyCheckAuthQuery } from "../../../store/auth-api/authApi"; // update the import path as needed
import styles from "./header.module.scss";
import { paths } from "../../../app/paths";
import userIcon from "../../../assets/icon/menu/user.svg";

interface SearchFormProps {
  search: string;
}

export default function Header() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormProps>();
  const navigate = useNavigate();
  const [trigger, { data: user, isLoading }] = useLazyCheckAuthQuery();

  const onSubmit = (data: SearchFormProps) => {
    console.log(data);
  };

  const createAds = () => {
    if (!user) {
      navigate(paths.auth);
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
  React.useEffect(() => {
    if (!isLoading && !user) {
      trigger();
    }
  }, []);

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
            onClick={() => navigate(paths.auth)}
          >
            Вход и регистрация
          </button>
        )}
      </div>
      <div className={styles.bottomRow}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.searchContainer}
        >
          <div className={styles.searchWrapper}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              {...register("search", {
                required: "Введите название услуги",
                minLength: {
                  value: 2,
                  message: "Минимум два символа",
                },
                maxLength: {
                  value: 40,
                  message: "Максимум сорок символов",
                },
              })}
              type="text"
              placeholder="Поиск услуги"
              className={styles.searchInput}
            />
            {errors.search && (
              <p className={styles.error}>{errors.search.message}</p>
            )}
          </div>
        </form>
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import ListServices from "./ListServices/ListServices";
import { useAppDispatch } from "../../../store/store";
import { changeSearchAction } from "../../../store/slices/serviceSlice";
import Filter from "./Filter/Filter";
import SearchWindow from "./SearchWindow/SearchWindow";
import style from "./catalog.module.scss";

interface ISearch {
  search: string;
}

export default function Catalog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISearch>({
    mode: "onChange",
  });

  const onSubmit = (data: ISearch) => {
    dispatch(changeSearchAction(data.search));
  };

  function handleGoBack() {
    navigate(-1);
  }

  function toggleSearchWindow() {
    setIsSearchWindowOpen(!isSearchWindowOpen);
  }

  return (
    <div className={style.catalog}>
      <header className={style.catalog__header}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={style.catalog__buttonArrow}
          onClick={handleGoBack}
        />
        <h1 className={style.catalog__headerTitle}>Солнечный Екб</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={style.catalog__searchContainer}
      >
        <button type="button" className={style.catalog__searchButton} onClick={toggleSearchWindow}>
          <FontAwesomeIcon icon={faSearch} className="icon" />
          <span className={style.catalog__searchButtonText}>Поиск</span>
        </button>
        <div className={style.catalog__searchWrapper}>
          <FontAwesomeIcon icon={faSearch} className={style.catalog__searchIcon} />
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
            className={style.catalog__searchInput}
          />
          {errors.search && <p className={style.catalog__error}>{errors.search.message}</p>}
        </div>
        <button type="submit" className={style.catalog__createButton}>
          Создать объявление
        </button>
      </form>

      <div className={style.catalog__main}>
        <div className={style.catalog__filter}>
          <Filter />
        </div>
        <div className={style.catalog__content}>
          <section>
            <header className={style.catalog__headerSection}>
              <h2 className={style.catalog__headerTitleSection}>Услуги</h2>
            </header>
          </section>

          <ListServices />
        </div>
      </div>

      {isSearchWindowOpen && <SearchWindow onClose={toggleSearchWindow} />}
    </div>
  );
}

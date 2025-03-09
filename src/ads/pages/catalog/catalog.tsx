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

      <nav className={style.catalog__breadcrumbs}>
        <a href="/">Главная</a> / <span>Каталог</span>
      </nav>

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

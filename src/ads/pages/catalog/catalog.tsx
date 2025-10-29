import  { useState } from "react";
import ListServices from "./ListServices/ListServices";
import store from "../../../store/store";
import {
  initPageAction,
} from "../../../store/slices/serviceSlice";
import Filter from "./Filter/Filter";
import SearchWindow from "./SearchWindow/SearchWindow";
import style from "./catalog.module.scss";


export const LoaderInitPage = async () => {
   store.dispatch(initPageAction());
   return null;
}

export default function Catalog() {
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);

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

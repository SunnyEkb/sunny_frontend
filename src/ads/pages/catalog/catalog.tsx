import { useState } from "react";
import ListServices from "./ListServices/ListServices";
import store from "../../../store/store";
import { initPageAction } from "../../../store/slices/serviceSlice";
import Filter from "./Filter/Filter";
import SearchWindow from "./SearchWindow/SearchWindow";
import ArrowBack from "../../../assets/icon/arrow-left.svg?react";

import style from "./catalog.module.scss";
import { useNavigate } from "react-router-dom";
import { useScrollRestoration } from "../../../shared/hooks/useScrollRestoration";
import BreadCrumbs from "../../../shared/Breadcrumbs/Breadcrumbs";

export const LoaderInitPage = async () => {
  store.dispatch(initPageAction());
  return null;
};

export default function Catalog() {
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const navigate = useNavigate();

  useScrollRestoration();

  function toggleSearchWindow() {
    setIsSearchWindowOpen(!isSearchWindowOpen);
  }

  return (
    <div className={style.catalog}>
     <BreadCrumbs paths={[{path: '', title: "Каталог"}]} className={style.breadcrumbs}/>

      <div className={style.catalog__main}>
        <div className={style.catalog__filter}>
          <Filter />
        </div>
        <div className={style.catalog__content}>
          <section>
            <header className={style.catalog__headerSection} onClick={() => {
              navigate('/');
            }}>
              <ArrowBack/>
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

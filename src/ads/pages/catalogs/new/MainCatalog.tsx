/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./mainCatalog.module.scss";
import CardCatalog from "../CardCatalog/CardCatalog";
import MiniAdCard from "../../catalog/MiniAdCard/MiniAdCard";
import { useLoaderData } from "react-router-dom";

import { mockCards } from "./mockCards";
import { useSearch } from "../../../../app/layouts/SearchProvider/SearchProvider";
import { useEffect, useState } from "react";
import { useGetSearchItemsQuery } from "../../../../store/entities/search/searchApi";
import SearchCard from "./SearchCard/SearchCard";

interface DataProps {
  id: number;
  title: string;
  subcategories: Array<unknown> | null;
  img?: string;
}

export const loaderCatagories = async () => {
  try {
    const response = await fetch("https://sunnyekb.ru/api/v1/categories/", {
      method: "GET",
      credentials: "include",
    });
    if (response.status == 401) {
      window.location.href = "/auth";
    }
    return response;
  } catch (e) {
    window.location.href = "/auth";
  }
};

export default function MainCatalog() {
  const data = useLoaderData() as DataProps[];
  const [searchString] = useSearch();
  const [debounceString, setDebounceString] = useState(searchString);
  const { data: searchItems } = useGetSearchItemsQuery(debounceString, {
    skip: debounceString?.length <= 2,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceString(searchString);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchString]);

  return (
    <section className={styles.section}>
      <section className={styles.breadcrumbs}>
        <a href="/">Главная</a> &gt; <span>На районе</span>
      </section>

      <section className={styles.sectionImg}>
        <div className={styles.img} />
      </section>

      <main className={styles.catalog__content}>
        {Array.isArray(searchItems) &&
          searchItems.length === 0 &&
          debounceString.length > 2 && (
            <span className={styles.title}>Ничего не найдено</span>
          )}

        {Array.isArray(searchItems) &&
          searchItems.length > 0 &&
          debounceString.length > 2 && (
            <>
              <h1 className={styles.title}>Найденные услуги и объявления</h1>
              <div className={styles.searchItemList}>
                {searchItems.map((item) => (
                  <SearchCard key={item.id} {...item} />
                ))}
              </div>
            </>
          )}

        {debounceString.length <= 2 && (
          <>
            <div className={styles.catalog__title}>На районе</div>
            <div className={styles.catalog__itemList}>
              {data?.map((card) => {
                return <CardCatalog key={card.id} card={card} />;
              })}
            </div>
          </>
        )}
      </main>

      {/* <section className={styles.newSection}>
        <div className={styles.newSectionTitle}>Новое</div>
        <div className={styles.newSectionGrid}>
          {mockAds?.map((ad: any) => (
            <MiniAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </section> */}
    </section>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./mainCatalog.module.scss";
import CardCatalog from "../CardCatalog/CardCatalog";

import { useLoaderData } from "react-router-dom";

import { useSearch } from "../../../../app/layouts/SearchProvider/SearchProvider";
import { useEffect, useState } from "react";
import { useGetSearchItemsQuery } from "../../../../store/entities/search/searchApi";
import MainCatalogCard from "./MainCatalogCard/MainCatalogCard";
import { useGetAllAdsQuery } from "../../../../store/entities/ads/adsApi";
import { useInView } from "react-intersection-observer";

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

  const [adPageParam, setAdPageParam] = useState(1);
  const { data: adResponse } = useGetAllAdsQuery({
    page: adPageParam,
    limit: 12,
  });
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceString(searchString);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchString]);

  useEffect(() => {
    if (adResponse?.next && inView) {
      setAdPageParam((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <section className={styles.section}>
      <div className={styles.breadcrumbs}>
        <a href="/">Главная</a> &gt; <span>На районе</span>
      </div>

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
              <div className={styles.mainList}>
                {searchItems.map((item) => (
                  <MainCatalogCard key={item.id} {...item} />
                ))}
              </div>
            </>
          )}

        {debounceString.length <= 2 && (
          <>
            <div className={styles.catalog__itemList}>
              {data?.map((card) => {
                return <CardCatalog key={card.id} card={card} />;
              })}
            </div>

            <div className={styles.ads_container}>
              <h2 className={styles.newSectionTitle}>
                Услуги и объявления соседей
              </h2>
              <div className={styles.mainList}>
                {adResponse?.results?.map((item, index) => {
                  const isLast = index === adResponse.results.length - 1;
                  return (
                    <MainCatalogCard
                      key={item.id}
                      {...item}
                      ref={isLast ? ref : null}
                    />
                  );
                })}
              </div>
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

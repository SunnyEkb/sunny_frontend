/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./mainCatalog.module.scss";
import CardCatalog from "../CardCatalog/CardCatalog";
import MiniAdCard from "../../catalog/MiniAdCard/MiniAdCard";
import { useLoaderData } from "react-router-dom";

interface DataProps {
  id: number;
  title: string;
  subcategories: Array<unknown> | null;
  img?: string;
}

export const loaderCatagories = async () => {
  const response = await fetch("https://sunnyekb.ru/api/v1/categories/", {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export default function MainCatalog() {
  const data = useLoaderData() as DataProps[];

  // Mock data for MiniAdCards
  /* const mockAds: any = [
    { id: 1, title: "Ad 1", price: "1000₽", location: "Location 1" },
    { id: 2, title: "Ad 2", price: "2000₽", location: "Location 2" },
    { id: 3, title: "Ad 3", price: "3000₽", location: "Location 3" },
    { id: 4, title: "Ad 4", price: "4000₽", location: "Location 4" },
  ]; */

  return (
    <section className={styles.section}>

      <section className={styles.breadcrumbs}>
        <a href="/">Главная</a> &gt; <span>На районе</span>
      </section>

      <section className={styles.sectionImg}>
        <div className={styles.img} />
      </section>

      <main className={styles.catalog__content}>
        <div className={styles.catalog__title}>На районе</div>
        <div className={styles.catalog__itemList}>
          {data?.map((card) => {
            return <CardCatalog key={card.id} card={card} />;
          })}
        </div>
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

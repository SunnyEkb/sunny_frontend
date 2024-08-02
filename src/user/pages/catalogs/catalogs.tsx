import styles from "./styles.module.scss";
// import { mockCatalog } from "./constantsMock";
import CardCatalog from "./CardCatalog/CardCatalog";
import Footer from "../../components/footer/Footer";
import { useLoaderData } from "react-router-dom";

interface DataProps {
  id: number;
  title: string;
  subcategories: Array<unknown> | null;
  img?: string;
}

export const loaderCatalogs = async () => {
  const response = await fetch("https://sunnyekb.ru/api/v1/types/", {
    method: "GET",
    credentials: "include",
  });

  return response;
};

export default function Catalogs() {
  const data = useLoaderData() as DataProps[];
  return (
    <section className={styles.section}>
      <header className={styles.catalog__header}>
        <h1 className={styles.catalog__headerTitle}>Солнечный Екб</h1>
      </header>

      <section className={styles.sectionImg}>
        <div className={styles.img} />
      </section>

      <main className={styles.catalog__content}>
        <div className={styles.catalog__title}>На районе</div>
        <div className={styles.catalog__itemList}>
          {data.map((card) => {
            return <CardCatalog key={card.id} card={card} />;
          })}
        </div>
      </main>
      <Footer />
    </section>
  );
}

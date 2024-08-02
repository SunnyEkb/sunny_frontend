import React from "react";
import styles from "./styles.module.scss";
import { mockCatalog } from "./constantsMock";
import CardCatalog from "./CardCatalog/CardCatalog";
import Footer from "../../components/footer/Footer";

export default function Catalogs() {
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
          {mockCatalog.map((card) => {
            return <CardCatalog key={card.id} card={card} />;
          })}
        </div>
      </main>
      <Footer />
    </section>
  );
}

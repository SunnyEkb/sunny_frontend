import styles from "./mainCatalog.module.scss";
import CardCatalog from "../CardCatalog/CardCatalog";
import MobileHeader from "../../../../user/components/header/MobileHeader";
import PcHeader from "../../../../user/components/header/PcHeader";
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

const isMobile = () => window.innerWidth <= 768;

export default function MainCatalog() {
  const data = useLoaderData() as DataProps[];
  const mobile = isMobile();

  return (
    <section className={styles.section}>
      {mobile ? <MobileHeader /> : <PcHeader />}

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

    </section>
  );
}

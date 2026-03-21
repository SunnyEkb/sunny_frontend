import { paths } from "../../../../app/paths";
import imgDefault from "../../../../assets/icon/cake.svg";
import styles from "./card.module.scss";

interface CardType {
  id: number;
  title: string;
  img?: string;
}

interface Props {
  card: CardType;
}

const CardCatalog = ({ card }: Props) => (
  <article className={styles.card}>
    <a className={styles.card__link} href={`${paths.catalogs}/${card.id}`}>
      <div className={styles.card__imgWrapper}>
        <img
          src={card.img || imgDefault}
          alt="картинка каталога"
          className={styles.card__img}
        />
        <div></div>
      </div>{" "}
      <h3 className={styles.card__title}>{card.title}</h3>
    </a>
  </article>
);

export default CardCatalog;

import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { paths } from "../../../../app/paths";

interface CardType {
  id: number;
  title: string;
  img: string;
}

interface Props {
  card: CardType;
}

export default function CardCatalog({ card }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`${paths.catalogs}/${card.id}`)}>
      <div className={styles.card__title}>{card.title}</div>
      <div className={styles.card__imgWrapper}> <img
        src={card.img}
        alt="картинка каталога"
        className={styles.card__img}
      /></div>
     
    </div>
  );
}

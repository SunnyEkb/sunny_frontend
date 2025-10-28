import styles from "./AdCard.module.scss";
import Image from "../../../../assets/icon/Foto.png";
import EditIcon from '../../../../assets/icon/Edit.svg';

interface ICard {
  title: string;
  price: number;
  description: string;
  image?: string;
}



export const AdCard = ({ title, price, description, image }: ICard) => {
  return (
    <article className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={image || Image} alt="картинка объявления" className={styles.img}/>
      </div>
      <div className={styles.content}>
        <h2 className={styles.price}>{price} ₽</h2>
        <button className={styles.editButton}><img src={EditIcon} alt="editIcon" className={styles.img}/></button>
        <h3 className={styles.title}>{title}</h3>
        <h3 className={styles.description}>{description}</h3>
      </div>
    </article>
  );
};

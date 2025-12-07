import { ISearchItem } from "../../../../../store/entities/search/searchApi";
import photo from "../../../../../assets/PhotoContainer.png";
import Heart from "../../../../../assets/icon/Heart.svg?react";

import styles from "./styles.module.scss";
import { memo } from "react";

const SearchCard = (searchItem: ISearchItem) => {
  return (
    <article className={styles.card}>
      <img src={searchItem.img || photo} alt={searchItem.title} className={styles.cardImg}/>
      <div className={styles.cardHead}>
        <h4>{searchItem.title}</h4>
        <button className={styles.cardLike}>
          <Heart color="currentColor" />
        </button>
      </div>
      <span>
        {searchItem.price || 1000}&nbsp;₽{" "}
        {searchItem.place_of_provision && "за услугу"}
      </span>
      <address className={styles.cardAddres}>
        {searchItem.address || "ул. Лучистая, 16"}
      </address>
    </article>
  );
};

export default memo(SearchCard);

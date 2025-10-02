import React from "react";
import styles from "./miniAdCard.module.scss";
import { AdsInfo } from "../../../common/model/ads";

interface Props {
  ad: AdsInfo;
}

const MiniAdCard = ({ ad }: Props) => {
  const defaultImg = "https://placehold.co/228x144";
  const imageAd = ad.images[0]?.image;
  console.log("imageAd", imageAd);
  return (
    <div className={styles.card}>
      <div className={styles.card__imgWrapper}>
        <img
          src={imageAd ? imageAd : defaultImg}
          alt="Ad"
          className={styles.card__img}
        />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{ad.title}</h3>
        </div>
        {/* <p className={styles.card__price}>{ad?.price}</p> */}
        <p className={styles.card__location}>{ad?.address}</p>
      </div>
    </div>
  );
};

export default MiniAdCard;

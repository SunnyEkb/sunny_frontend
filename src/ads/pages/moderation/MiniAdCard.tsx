import React from 'react';
import styles from './miniAdCard.module.scss';

const MiniAdCard = ({ ad }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__imgWrapper}>
        <img src="https://placehold.co/228x144" alt="Ad" className={styles.card__img} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{ad.title}</h3>
        </div>
        <p className={styles.card__price}>{ad.price}</p>
        <p className={styles.card__location}>{ad.location}</p>
      </div>
    </div>
  );
};

export default MiniAdCard;

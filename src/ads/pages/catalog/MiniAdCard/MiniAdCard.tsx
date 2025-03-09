import React from 'react';
import styles from './miniAdCard.module.scss';
import heartLike from '../../../../assets/icon/Heart.svg';
import heartLiked from '../../../../assets/icon/Heart_liked.svg';

interface AdProps {
  ad: {
    id: number;
    title: string;
    price: string;
    location: string;
  };
}

const MiniAdCard: React.FC<AdProps> = ({ ad }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__imgWrapper}>
        <img src="https://placehold.co/228x144" alt="Ad" className={styles.card__img} />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__header}>
          <h3 className={styles.card__title}>{ad.title}</h3>
          <img src={heartLike} alt="Like" className={styles.card__like} />
        </div>
        <p className={styles.card__price}>{ad.price}</p>
        <p className={styles.card__location}>{ad.location}</p>
      </div>
    </div>
  );
};

export default MiniAdCard;

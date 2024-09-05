import React from "react";
import style from './style.module.scss';
import star from '../../../assets/icon/Star.svg';

interface Props {
  card: any;
}

export default function CardCatalogAuthor({card}: Props) {
  return (
    <React.Fragment>
      <div className={style.catalog__cardAuthor}>
        Имя мастера / {card?.salon_name ? card.salon_name  : 'Название салона'}
      </div>

      <div className={style.catalog__cardRaiting}>
        <div className={style.catalog__cardAverage}>4,9</div>

        <div className={style.catalog__cardCountStars}>
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
        </div>

        <div className={style.catalog__cardCount}>69 отзывов</div>
      </div>
    </React.Fragment>
  );
}

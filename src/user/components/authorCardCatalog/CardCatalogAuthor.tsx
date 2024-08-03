import React from "react";
import style from './style.module.scss';
import star from '../../../assets/icon/Star.svg';

export default function CardCatalogAuthor() {
  return (
    <React.Fragment>
      <div className={style.catalog__cardAuthor}>
        Имя мастера / Название салона
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

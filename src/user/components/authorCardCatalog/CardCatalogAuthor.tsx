import React from "react";
import style from './style.module.scss';
import star from '../../../assets/icon/Star.svg';
import { AdsInfo } from "../../../ads/pages/CardCatalogBig/CardCatalogBig";

interface Props {
  card: AdsInfo;
}

export default function CardCatalogAuthor({card}: Props) {
  return (
    <React.Fragment>
      <div className={style.catalog__cardAuthor}>
        {`${card.provider.first_name || card.provider.username || card.provider.email} `} / {card.salon_name  || 'Название салона'}
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

        <div className={style.catalog__cardCount}>{card.comments_quantity} отзывов</div>
      </div>
    </React.Fragment>
  );
}

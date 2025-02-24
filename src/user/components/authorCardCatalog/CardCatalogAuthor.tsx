import React from "react";
import style from './authorCard.module.scss';
import star from '../../../assets/icon/Star.svg';
import { AdsInfo } from "../../../common/model/ads";

interface Props {
  card: AdsInfo;
}

export default function CardCatalogAuthor({card}: Props) {
  const handleGoAds = () => {
    // Add your navigation logic here
  };

  return (
    <div className={style.author__card}>
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


      </div>
      <div className={style.catalog__cardCount}>{card.comments_quantity} отзывов</div>

      <div className={style.catalog__buttons}>
        <button className={style.catalog__cardButton} onClick={handleGoAds}>
          Позвонить
        </button>
        <button className={style.catalog__cardButton} onClick={handleGoAds}>
          Написать
        </button>
      </div>
    </div>
  );
}

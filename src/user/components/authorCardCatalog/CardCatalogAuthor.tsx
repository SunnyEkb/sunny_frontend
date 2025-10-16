import React from "react";
import style from "./authorCard.module.scss";
import star from "../../../assets/icon/Star.svg";
import { AdsInfo } from "../../../common/model/ads";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/store";

interface Props {
  card: AdsInfo;
}

export default function CardCatalogAuthor({ card }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const handleGoAds = () => {
    if (user) {
      navigate(`/chat/service/${card.id}/${user.id}`);
    } else {
      console.warn("Вы не авторизованы");
    }
  };

  return (
    <div className={style.author__card}>
      <h3 className={style.catalog__cardAuthor}>
        {`${
          card.provider.first_name ||
          card.provider.username ||
          card.provider.email
        } `}{" "}
        / {card.salon_name || "Название салона"}
      </h3>

      <div className={style.catalog__cardRaiting}>
        <div>4,9</div>

        <div className={style.catalog__cardCountStars}>
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
          <img src={star} alt="звезда" className={style.arrowBack} />
        </div>

        <div >
          {card.comments_quantity} отзывов
        </div>
      </div>

      <div className={style.catalog__buttons}>
        <button className={style.catalog__cardButton} onClick={handleGoAds}>
          Написать
        </button>
      </div>
    </div>
  );
}

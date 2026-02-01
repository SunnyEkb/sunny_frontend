import React from "react";
import style from "./authorCard.module.scss";
import Star from "../../../assets/icon/Star.svg?react";
import { ServiceInfo } from "../../../common/model/ads";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/store";
import { useAuthModal } from "../../providers/AuthModalContext";

interface Props {
  card: ServiceInfo;
}

export default function CardCatalogAuthor({ card }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const { openLogin } = useAuthModal();
  const navigate = useNavigate();
  const handleGoAds = () => {
    if (user) {
      navigate(`/chat/${card.type}/${card.id}/${user.id}`);
    } else {
      openLogin();
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
          {Array.from({ length: 5 }, (_, idx) => idx + 1).map((rat) => (
            <Star key={rat} color="#ffcc33" />
          ))}
        </div>

        <div>{card.comments_quantity} отзывов</div>
      </div>

      <div className={style.catalog__buttons}>
        <button className={style.catalog__cardButton} onClick={handleGoAds}>
          Написать
        </button>
      </div>
    </div>
  );
}

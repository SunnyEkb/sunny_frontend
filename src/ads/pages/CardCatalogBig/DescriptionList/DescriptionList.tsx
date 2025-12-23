import React from "react";
import style from "./style.module.scss";
import { AdInfo } from "../../../../store/entities/ads/adsApi";
import { ServiceInfo } from "../../../../common/model/ads";

interface Props {
  card: ServiceInfo & AdInfo;
  isAd: boolean;
}

export default function DescriptionList({ card, isAd }: Props) {
  return (
    <section className={style.cardBig__descriptionSection}>
      <h4 className={style.cardBig__descriptionTitle}>
        {isAd ? "Характеристики" : "Подробности"}
      </h4>

      {isAd ? (
        <div className={style.cardBig__descriptionInfo}>
          <div className={style.cardBig__descriptionRow}>
            <div className={style.cardBig__descriptionCategory}>Cостояние:</div>
            <div className={style.cardBig__descriptionName}>
              {card.condition}
            </div>
          </div>
        </div>
      ) : (
        <div className={style.cardBig__descriptionInfo}>
          <div className={style.cardBig__descriptionRow}>
            <div className={style.cardBig__descriptionCategory}>
              Вид услуги:
            </div>
            <div className={style.cardBig__descriptionName}>
              Красота, здоровье
            </div>
          </div>

          <div className={style.cardBig__descriptionRow}>
            <div className={style.cardBig__descriptionCategory}>
              Тип услуги:
            </div>
            <div className={style.cardBig__descriptionName}>
              Маникюр, педикюр
            </div>
          </div>

          <div className={style.cardBig__descriptionRow}>
            <div className={style.cardBig__descriptionCategory}>
              Место встречи:
            </div>
            <div className={style.cardBig__descriptionName}>
              {card.place_of_provision}
            </div>
          </div>

          <div className={style.cardBig__descriptionRow}>
            <div className={style.cardBig__descriptionCategory}>
              Опыт работы:
            </div>
            <div className={style.cardBig__descriptionName}>
              {card.experience} лет
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import React from "react";
import style from "./style.module.scss";
import { ServiceInfo } from "../../../../common/model/ads";
// import { rowYsligi } from "../../catalog/mock";

interface Props {
  variant: "smallInfo" | "bigInfo";
  cardData: ServiceInfo;
}

export default function PriceLists({ variant, cardData }: Props) {
  const [isShowAll, setShowAll] = React.useState(false);

  function handleShow() {
    setShowAll((prev) => !prev);
  }

  const visibleServiceList = cardData.type === 'service'?  isShowAll
    ? cardData.price_list_entries
    : cardData.price_list_entries.slice(0, 5) : [];

  if (variant == "smallInfo") {
    return (
      <div className={style.catalog__cardInfo}>
        {cardData.price &&
          typeof cardData.price === "object" &&
          !Array.isArray(cardData.price) &&
          Object.entries(cardData.price).map(([key, value], index) => {
            return (
              <div className={style.catalog__cardRowInfo} key={index}>
                <div className={style.catalog__cardRowTitle}>{key}</div>
                <div className={style.catalog__cardRowPrice}>{value} ₽</div>
              </div>
            );
          })}
      </div>
    );
  }

  if (variant == "bigInfo") {
    return (
      <div className={style.catalog__cardInfo}>
        <h4 className={style.catalog__title}>Прайс-лист</h4>

        {!!visibleServiceList.length &&
          visibleServiceList.map(({ id, title, price }) => (
            <div className={style.catalog__cardRowInfo} key={id}>
              <div className={style.catalog__cardRowTitle}>{title}</div>
              <div className={style.catalog__cardRowPrice}>{price} ₽</div>
            </div>
          ))}
        {/* {rowYsligi.slice(0, !isShow ? 3 : -1).map((item) => {
          return (
            <div className={style.catalog__cardRowInfo} key={item.id}>
              <div className={style.catalog__cardRowTitle}>{item.title}</div>
              <div className={style.catalog__cardRowPrice}>{item.price}</div>
            </div>
          );
        })} */}
        {visibleServiceList.length > 5 && (
          <button className={style.button} onClick={handleShow}>
            {!isShowAll ? "Все услуги" : "Скрыть"}
          </button>
        )}
      </div>
    );
  }
}

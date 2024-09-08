import React from "react";
import style from "./style.module.scss";
import { rowYsligi } from "../../catalog/mock";

interface Props {
  variant: "smallInfo" | "bigInfo";
}

export default function PriceLists({ variant }: Props) {
  const [isShow, setShow] = React.useState(false);

  function handleShow() {
    setShow((prev) => !prev);
  }


  if (variant == "smallInfo") {
    return (
      <div className={style.catalog__cardInfo}>
        {rowYsligi.slice(0, 3).map((item) => {
          return (
            <div className={style.catalog__cardRowInfo} key={item.id}>
              <div className={style.catalog__cardRowTitle}>{item.title}</div>
              <div className={style.catalog__cardRowPrice}>{item.price}</div>
            </div>
          );
        })}
      </div>
    );
  }

  if (variant == "bigInfo") {
    return (
      <div className={style.catalog__cardInfo}>
        {rowYsligi.slice(0, !isShow ? 3 : -1).map((item) => {
          return (
            <div className={style.catalog__cardRowInfo} key={item.id}>
              <div className={style.catalog__cardRowTitle}>{item.title}</div>
              <div className={style.catalog__cardRowPrice}>{item.price}</div>
            </div>
          );
        })}

        <button className={style.button} onClick={handleShow}>
          {!isShow ? "Все услуги" : "Скрыть"}
        </button>
      </div>
    );
  }
}

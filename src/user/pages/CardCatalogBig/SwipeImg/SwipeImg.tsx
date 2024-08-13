import React from "react";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import style from "./style.module.scss";

export default function SwipeImg() {
  return <div className={style.section__swipe}>
    <img src={defaultPhoto} alt="услуга" className={style.cardPhoto} />;
  </div>;
}

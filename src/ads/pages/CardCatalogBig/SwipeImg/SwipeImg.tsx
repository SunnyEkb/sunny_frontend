import React from "react";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import style from "./style.module.scss";

interface Props {
  imgList: {
    id: number;
    image: string;
  }[];
}

export default function SwipeImg({ imgList }: Props) {
  return (
    <div className={style.section__swipe}>
      <img src={defaultPhoto} alt="услуга" className={style.cardPhoto} />;
    </div>
  );
}

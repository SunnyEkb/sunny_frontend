import React from "react";
import style from "./style.module.scss";
import star from "../../../../assets/icon/Star.svg";

interface Props {
  extraClass?: string;
  extraClassStar?: string;
}

export default function Rating({extraClass, extraClassStar}: Props) {
  return (
    <div
      className={`${style.commentItem__rating} ${extraClass ? extraClass : ""}`}
    >
      <div className={`${style.commentItem__cardCountStars} ${extraClassStar ? extraClassStar : ''}`}>
        <img src={star} alt="звезда" />
        <img src={star} alt="звезда" />
        <img src={star} alt="звезда" />
        <img src={star} alt="звезда" />
        <img src={star} alt="звезда" />
      </div>
    </div>
  );
}

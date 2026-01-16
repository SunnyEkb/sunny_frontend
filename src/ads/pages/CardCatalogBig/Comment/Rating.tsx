import React from "react";
import style from "./style.module.scss";
import star from "../../../../assets/icon/Star.svg";

interface Props {
  extraClass?: string;
  extraClassStar?: string;
  onClick?: (rating: number) => void;
  rating?: number;
}

export default function Rating({extraClass, extraClassStar, onClick, rating}: Props) {
  // const starsCount = rating ? rating : undefined
  return (
    <div
      className={`${style.commentItem__rating} ${extraClass ? extraClass : ""}`}
    >
      <div className={`${style.commentItem__cardCountStars} ${extraClassStar ? extraClassStar : ''}`}>
        <img src={star} alt="звезда" onClick={() => onClick?.(1)}/>
        <img src={star} alt="звезда" onClick={() => onClick?.(2)}/>
        <img src={star} alt="звезда" onClick={() => onClick?.(3)}/>
        <img src={star} alt="звезда" onClick={() => onClick?.(4)}/>
        <img src={star} alt="звезда" onClick={() => onClick?.(5)}/>


          {/* {rating && starsCount && [...Array(starsCount)].map((_, index) => {
          const starNumber = index + 1;
          const isActive = starNumber <= rating;

          return (
            <img
              key={starNumber}
              src={isActive ? starActive : starInactive} // starActive — закрашенная звезда, starInactive — пустая
              alt="звезда"
              onClick={() => onClick?.(starNumber)}
              style={{cursor: onClick ? 'pointer' : 'default'}}
            />
          );
        })} */}
      </div>
    </div>
  );
}

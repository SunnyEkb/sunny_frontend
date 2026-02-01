import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Star from "../../../../assets/icon/Star.svg?react";

interface Props {
  extraClass?: string;
  extraClassStar?: string;
  onClick?: (rating: number) => void;
  rating: number;
}

export default function Rating({
  extraClass,
  extraClassStar,
  onClick,
  rating,
}: Props) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div
      className={`${style.commentItem__rating} ${extraClass ? extraClass : ""}`}
    >
      <div
        onMouseLeave={() => setHoverRating(null)}
        className={`${style.commentItem__cardCountStars} ${extraClassStar ? extraClassStar : ""}`}
      >
        {Array.from({ length: 5 }, (_, idx) => idx + 1).map((rat) => {
          const isActive = hoverRating ? rat <= hoverRating : rat <= rating;

          return (
            <Star
              key={rat}
              role="button"
              aria-label={`Оценка ${rat} из 5`}
              color={`${isActive ? "#FFCC33" : "transparent"}`}
              stroke={`${isActive ? "#FFCC33" : "#b2bdc7"}`}
              onMouseOver={() => {
                setHoverRating(rat);
              }}
              onClick={() => {
                onClick?.(rat);
              }}
            />
          );
        })}

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

import React, { useState } from "react";
import style from "./style.module.scss";
import CommentItem from "../Comment/Comment";
import CommentWindow from "../CommentWindow/CommentWindow";

export default function CommentSection() {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleButtonClick = () => {
    setIsInputVisible((prev) => !prev);
  };

  return (
    <>
      <h4 className={style.cardBig__section__title}>Отзывы клиентов</h4>

      {!isInputVisible && (
        <button className={style.cardBig__button} onClick={handleButtonClick}>
          Оставить отзыв
        </button>
      )}

      {isInputVisible && <CommentWindow onClose={handleButtonClick} />}

      <CommentItem />
      <CommentItem />
      <CommentItem />
    </>
  );
}

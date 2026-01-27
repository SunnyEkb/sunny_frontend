import React, { useState } from "react";
import style from "./style.module.scss";
import CommentItem from "../Comment/Comment";
import CommentWindow from "../CommentWindow/CommentWindow";
import { useAppSelector } from "../../../../store/store";
import { useAuthModal } from "../../../../user/providers/AuthModalContext";

export interface IComment {
  content_type: number;
  object_id: number;
  rating: number;
  feedback: string;
  id: number;
  author: {
    id: number;
    username: string;
    email: string;
    avatar: string;
  };
  image: {
    id: string;
    image: string;
  }[];
}

interface Props {
  comments: IComment[];
}

export default function CommentSection({ comments }: Props) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const { openLogin } = useAuthModal();

  const handleButtonClick = () => {
    if (user) {
      setIsInputVisible((prev) => !prev);
    } else {
      openLogin();
    }
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
      {comments.length > 0 &&
        comments.map((item) => {
          return <CommentItem key={item.id} comment={item} />;
        })}
    </>
  );
}

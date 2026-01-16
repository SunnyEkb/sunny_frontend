import { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import Avatar from "../../../../user/components/avatar/Avatar";
import Rating from "./Rating";
import { IComment } from "../CommentSection/CommentSection";

interface Props {
  comment: IComment
}

export default function CommentItem({comment}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > 60; // 60px — высота в css
      setShowButton(isOverflowing);
    }
  }, [comment.feedback]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={style.commentItem}>
      <div className={style.commentItem__header}>
        <Avatar
          avatarUrl=""
          initial="В"
          className={style.commentItem__avatar}
        />
        <div className={style.commentItem__infoWrapper}>
          <div className={style.commentItem__infoTitle}>{comment.author.username}</div>
          <div className={style.commentItem__infoSubtitle}>5 октября </div>
        </div>
      </div>

      <Rating rating={comment.rating} />

      <div className={style.commentItem__notif}>Комментарий</div>

      <div className={style.commentItem__textWrapper}>
        <div
          className={style.commentItem__textComment}
          style={{
            height: isExpanded ? "auto" : "60px",
            overflow: isExpanded ? "visible" : "hidden",
          }}
        >
          {comment.feedback}
        </div>
        {!showButton && (
          <div
            className={style.commentItem__buttonTextFull}
            onClick={toggleExpand}
          >
            {isExpanded ? "Свернуть" : "Показать полностью"}
          </div>
        )}
      </div>
    </div>
  );
}

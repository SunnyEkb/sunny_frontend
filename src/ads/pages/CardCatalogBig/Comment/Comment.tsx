import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import Avatar from "../../../../user/components/avatar/Avatar";
import { mockComment } from "./helper";
import Rating from "./Rating";

//mock

export default function CommentItem() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > 60; // 60px — высота в css
      setShowButton(isOverflowing);
    }
  }, [mockComment]);

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
          <div className={style.commentItem__infoTitle}>Валерия</div>
          <div className={style.commentItem__infoSubtitle}>5 октября </div>
        </div>
      </div>

      <Rating />

      <div className={style.commentItem__notif}>Комментарий</div>

      <div className={style.commentItem__textWrapper}>
        <div
          className={style.commentItem__textComment}
          style={{
            height: isExpanded ? "auto" : "60px",
            overflow: isExpanded ? "visible" : "hidden",
          }}
        >
          {mockComment}
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

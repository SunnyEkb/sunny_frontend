import React from "react";
import styles from "./style.module.scss";
import defaultAvatar from "../../../../assets/Avatar.svg";

interface Props {
  message: IMessage;
}

interface IMessage {
  id: string;
  text: string;
  avatar?: string;
  time: string;
  read?: boolean;
}

export default function Message({ message }: Props) {
  function formatTime(date: Date): string {
    const hours: string = String(date.getHours()).padStart(2, "0");
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className={styles.message}>
      <div className={styles.message__avatar}>
        <img
          src={message.avatar ? message.avatar : defaultAvatar}
          alt="avatar"
          className={styles.message__avatarImg}
        />
      </div>

      <div className={styles.message__content}>
        <div className={styles.message__text}>{message.text}</div>
      </div>

      <div className={styles.message__time}>{formatTime(new Date())}</div>
    </div>
  );
}

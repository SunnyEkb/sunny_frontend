import React from "react";
import styles from "./style.module.scss";
import defaultAvatar from "../../../../assets/Avatar.svg";


import { ChatMessages } from "../../../../store/actions/chat";
import { useAppSelector } from "../../../../store/store";

interface Props {
  message: ChatMessages;
}

// interface IMessage {
//   id: string;
//   receiverId: string;
//   text: string;
//   avatar?: string;
//   time: string;
//   read?: boolean;
// }

export default function Message({ message}: Props) {
  const userInfo = useAppSelector((state) => state.auth.user);
  function formatTime(date: Date): string {
    const hours: string = String(date.getHours()).padStart(2, "0");
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const avatarSrc =
    message && userInfo && message.sender_username === userInfo.username
      ? (userInfo.avatar as string) || defaultAvatar
      : (message.avatar as string) || defaultAvatar;


  return (
    <div
      className={
        message.sender_username === userInfo?.username
          ? styles.message
          : `${styles.message} ${styles.message_reverse}`
      }
    >
      <div className={styles.message__avatar}>
        <img
          src={avatarSrc}
          alt="avatar"
          className={styles.message__avatarImg}
        />
      </div>

      <div className={styles.message__content}>
        <div className={styles.message__text}>{message.message}</div>
      </div>

      <div className={styles.message__time}>{formatTime(new Date())}</div>
    </div>
  );
}

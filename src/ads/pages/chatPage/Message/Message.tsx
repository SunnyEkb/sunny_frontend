import React from "react";
import styles from "./style.module.scss";
import defaultAvatar from "../../../../assets/Avatar.svg";

import { CHATImageData, ChatMessages } from "../../../../store/actions/chat";
import { useAppSelector } from "../../../../store/store";
import MessageImage from "../MessageImage/MessageImage";

interface Props {
  message: ChatMessages;
  date?: string;
  images?: CHATImageData[];
}

// interface IMessage {
//   id: string;
//   receiverId: string;
//   text: string;
//   avatar?: string;
//   time: string;
//   read?: boolean;
// }

export default function Message({ message, date, images }: Props) {
  const userInfo = useAppSelector((state) => state.auth.user);
  function formatTime(date: Date): string {
    const hours: string = String(date.getHours()).padStart(2, "0");
    const minutes: string = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const isOwnMessage =
    (message.sender_id !== undefined &&
      userInfo?.id !== undefined &&
      String(message.sender_id) === String(userInfo.id)) ||
    (message.sender_username !== undefined &&
      userInfo?.username !== undefined &&
      message.sender_username === userInfo.username);

  const avatarSrc = isOwnMessage
    ? (userInfo?.avatar as string) || defaultAvatar
    : (message.avatar as string) || defaultAvatar;


  const chunkImages = (
    arr: CHATImageData[],
    size: number,
  ): CHATImageData[][] => {
    const chunks: CHATImageData[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };


  const imageChunks = images ? chunkImages(images, 10) : [];

  return (
    <>
      {date && <div className={styles.message__date}>{date}</div>}

      <div
        className={
          isOwnMessage
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
          {imageChunks.length > 0 &&
            imageChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className={styles.message__images__content}
                data-count={chunk.length}
              >
                {chunk.map((image, index) => {
                  const globalIndex = chunkIndex * 10 + index;
                  const uniqueKey = `${image.name}_${image.data.byteLength || 0}_${globalIndex}`;

                  return <MessageImage key={uniqueKey} {...image} />;
                })}
              </div>
            ))}
          {message.message && (
            <div className={styles.message__text}>{message.message}</div>
          )}
        </div>

        <div className={styles.message__time}>
          {formatTime(new Date(message.created_at))}
        </div>
      </div>
    </>
  );
}

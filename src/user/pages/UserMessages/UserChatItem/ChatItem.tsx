import { Link } from "react-router-dom";
import defaultAvatar from "../../../../assets/Avatar.svg";
import type { ChatDto } from "../../../../shared/api/chatApi";
import ReadIcon from "../../../../assets/icon/read.svg?react";
import UnreadIcon from "../../../../assets/icon/unread.svg?react";
import styles from "./ChatItem.module.scss";

interface Props {
  chat: ChatDto;
  currentUserId: string;
}

const ChatItem = ({ chat, currentUserId }: Props) => {
  const lastMessage = chat.messages[0];
  const companionId =
    chat.sender_id === currentUserId ? chat.recipient_id : chat.sender_id;
  const isOwnLastMessage = lastMessage?.sender_id === currentUserId;

  return (
    <li className={styles.item}>
      <Link to={`/my-messages/${chat.id}`} className={styles.link}>
        <div className={styles.imgContainer}>
          <img
            className={styles.userAvatar}
            src={defaultAvatar}
            alt="Аватар собеседника"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <h5 className={styles.userName}>Пользователь #{companionId}</h5>
          </div>
          <div className={styles.itemDetails}>
            <span>Объявление #{chat.ad_id}</span>
          </div>
          <p className={styles.lastMessage}>
            {lastMessage?.text ?? "Нет сообщений"}
          </p>
        </div>
        {lastMessage && (
          <div className={styles.messageDetails}>
            {isOwnLastMessage &&
              (lastMessage.status === "read" ? <ReadIcon /> : <UnreadIcon />)}
            <span className={styles.dateMessage}>
              <time>
                {new Date(lastMessage.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                })}
              </time>
            </span>
          </div>
        )}
      </Link>
    </li>
  );
};

export default ChatItem;

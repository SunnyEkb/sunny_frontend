import { Link } from "react-router-dom";
import ReadIcon from "../../../../assets/icon/read.svg?react";
import UnreadIcon from "../../../../assets/icon/unread.svg?react";

import styles from "./ChatItem.module.scss";

export interface Chat {
  id: number;
  user: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  item: {
    title: string;
    price: number;
    imageUrl: string;
  };
  lastMessage: {
    text: string;
    createdAt: string;
    from: "user" | "companion";
    isRead: boolean | null;
  };
}


const ChatItem = ({ chat }: { chat: Chat }) => (
  <li key={chat.id} className={styles.item}>
    <Link to={`/my-messages/${chat.id}`} className={styles.link}>
      <div className={styles.imgContainer}>
        <img
          className={styles.itemImg}
          src={chat.item.imageUrl}
          alt="Картинка товара"
        />
        <img
          className={styles.userAvatar}
          src={chat.user.avatar}
          alt="Картинка пользователя"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.userInfo}>
          <h5 className={styles.userName}>{chat.user.name}</h5>
          {chat.user.isOnline && <div className={styles.onlineStatus}></div>}
        </div>

        <div className={styles.itemDetails}>
          <span className={styles.itemTitle}>{chat.item.title}</span>
          <span>{chat.item.price}&nbsp;₽</span>
        </div>
        <p className={styles.lastMessage}>{chat.lastMessage.text}</p>
      </div>
      <div className={styles.messageDetails}>
        {chat.lastMessage.from === "user" &&
          (chat.lastMessage.isRead ? <ReadIcon /> : <UnreadIcon />)}
        <span className={styles.dateMessage}>
          <time>
            {new Date(chat.lastMessage.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
            })}
          </time>
        </span>
      </div>
    </Link>
  </li>
);


export default ChatItem;
